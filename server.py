import http.server
import json
import urllib.request
import urllib.error
import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from pathlib import Path

PORT = 8080
NVIDIA_KEY = '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'
WHATSAPP_NUMBER = '56935621667'
RESERVAS_FILE = 'reservas.json'

# --- Email Config (Gmail) ---
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USER = ''  # tu@gmail.com
EMAIL_PASS = ''  # App password de Gmail
EMAIL_FROM = 'Santerra Buffet'


def load_reservas():
    if Path(RESERVAS_FILE).exists():
        with open(RESERVAS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []


def save_reservas(reservas):
    with open(RESERVAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(reservas, f, ensure_ascii=False, indent=2)


def send_confirmation_email(reserva):
    if not EMAIL_USER or not EMAIL_PASS:
        print('[EMAIL] Config no definida, saltando envio.')
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = f'{EMAIL_FROM} <{EMAIL_USER}>'
        msg['To'] = reserva['email']
        msg['Subject'] = f'Reserva Confirmada - Santerra Buffet | {reserva["date"]}'

        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #6B1C20; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <h1 style="color: #C9A84C; margin: 0; font-size: 28px;">Santerra Buffet</h1>
                <p style="color: white; margin: 5px 0 0;">Reserva Confirmada</p>
            </div>
            <div style="background: #F5F3EE; padding: 30px; border-radius: 0 0 12px 12px;">
                <h2 style="color: #1A1A1A; margin-top: 0;">Hola {reserva['name']},</h2>
                <p style="color: #555; line-height: 1.6;">Tu reserva ha sido confirmada. Te esperamos en Santerra Buffet.</p>
                <div style="background: white; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #C9A84C;">
                    <p style="margin: 8px 0;"><strong>Fecha:</strong> {reserva['date']}</p>
                    <p style="margin: 8px 0;"><strong>Hora:</strong> {reserva['time']}</p>
                    <p style="margin: 8px 0;"><strong>Personas:</strong> {reserva['people']}</p>
                    <p style="margin: 8px 0;"><strong>Reserva ID:</strong> #{reserva['id']}</p>
                </div>
                <p style="color: #555; line-height: 1.6;">
                    <strong>Direccion:</strong> Avenida San Martin 199, Casino Enjoy, Viña del Mar<br>
                    <strong>WhatsApp:</strong> +56 9 5053 8952
                </p>
                <p style="color: #888; font-size: 12px; margin-top: 30px;">
                    Si necesitas modificar o cancelar tu reserva, contactanos por WhatsApp.
                </p>
            </div>
        </div>
        """

        msg.attach(MIMEText(html, 'html'))

        context = ssl.create_default_context()
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls(context=context)
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, reserva['email'], msg.as_string())

        print(f'[EMAIL] Enviado a {reserva["email"]}')
        return True

    except Exception as e:
        print(f'[EMAIL] Error: {e}')
        return False


def send_whatsapp_confirmation(reserva):
    date_obj = datetime.strptime(reserva['date'], '%Y-%m-%d')
    formatted_date = date_obj.strftime('%d/%m/%Y')
    message = (
        f'Hola {reserva["name"]}, tu reserva en Santerra Buffet esta confirmada:\n'
        f'Fecha: {formatted_date}\n'
        f'Hora: {reserva["time"]}\n'
        f'Personas: {reserva["people"]}\n'
        f'ID: #{reserva["id"]}\n\n'
        f'Te esperamos! Avenida San Martin 199, Casino Enjoy.'
    )
    return f'https://wa.me/{WHATSAPP_NUMBER}?text={urllib.parse.quote(message)}'


class Handler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path.startswith('/api/reservas'):
            self.handle_get_reservas()
        else:
            super().do_GET()

    def handle_get_reservas(self):
        reservas = load_reservas()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(reservas, ensure_ascii=False).encode())

    def do_POST(self):
        if self.path == '/api/pasta':
            self.handle_pasta()
        elif self.path == '/api/reservas':
            self.handle_reserva()
        else:
            self.send_response(404)
            self.end_headers()

    def handle_pasta(self):
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length)

        try:
            req = urllib.request.Request(
                'https://integrate.api.nvidia.com/v1/chat/completions',
                data=body,
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + NVIDIA_KEY
                },
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                result = resp.read()

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(result)

        except urllib.error.HTTPError as e:
            error_body = e.read()
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(error_body)

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

    def handle_reserva(self):
        length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(length))

        reservas = load_reservas()
        reserva_id = len(reservas) + 1

        reserva = {
            'id': reserva_id,
            'name': body.get('name', ''),
            'phone': body.get('phone', ''),
            'email': body.get('email', ''),
            'date': body.get('date', ''),
            'time': body.get('time', ''),
            'people': body.get('people', 0),
            'status': 'confirmada',
            'created_at': datetime.now().isoformat()
        }

        reservas.append(reserva)
        save_reservas(reservas)

        email_sent = False
        if reserva.get('email'):
            email_sent = send_confirmation_email(reserva)

        wa_link = send_whatsapp_confirmation(reserva)

        response = {
            'success': True,
            'reserva': reserva,
            'email_sent': email_sent,
            'whatsapp_link': wa_link,
            'message': f'Reserva #{reserva_id} confirmada'
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode())

        print(f'[RESERVA] #{reserva_id} - {reserva["name"]} - {reserva["date"]} {reserva["time"]} - {reserva["people"]} personas')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        print(f'[SERVER] {args[0]}')


if __name__ == '__main__':
    print(f'')
    print(f'  ====================================')
    print(f'   Santerra Buffet - Server')
    print(f'  ====================================')
    print(f'')
    print(f'  Sitio:    http://localhost:{PORT}')
    print(f'  Reservas: http://localhost:{PORT}/api/reservas')
    print(f'')
    print(f'  Email:    {"Configurado" if EMAIL_USER else "No configurado (edita server.py)"}')
    print(f'  WhatsApp: +{WHATSAPP_NUMBER}')
    print(f'')
    print(f'  Ctrl+C para detener')
    print(f'')
    with http.server.HTTPServer(('', PORT), Handler) as server:
        server.serve_forever()
