from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import quote
from datetime import datetime
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

WHATSAPP_NUMBER = '56935621667'


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'message': 'API de reservas Santerra Buffet'}).encode())

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(length))

        reserva_id = format(int(datetime.now().timestamp()), 'x').upper()

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

        date_obj = datetime.strptime(reserva['date'], '%Y-%m-%d')
        formatted_date = date_obj.strftime('%d/%m/%Y')
        message = (
            f'Hola {reserva["name"]}, tu reserva en Santerra Buffet esta confirmada:\n'
            f'Fecha: {formatted_date}\n'
            f'Hora: {reserva["time"]}\n'
            f'Personas: {reserva["people"]}\n'
            f'ID: #{reserva_id}\n\n'
            f'Te esperamos! Avenida San Martin 199, Casino Enjoy.'
        )
        wa_link = f'https://wa.me/{WHATSAPP_NUMBER}?text={quote(message)}'

        email_sent = False
        email_user = os.environ.get('EMAIL_USER', '')
        email_pass = os.environ.get('EMAIL_PASS', '')
        if reserva['email'] and email_user and email_pass:
            try:
                msg = MIMEMultipart('alternative')
                msg['From'] = email_user
                msg['To'] = reserva['email']
                msg['Subject'] = f'Reserva Santerra Buffet Confirmada #{reserva_id}'
                html = f"""\
                <html><body style="font-family:sans-serif;padding:20px">
                <h2 style="color:#6B1C20;">Reserva Confirmada</h2>
                <p>Hola <strong>{reserva['name']}</strong>,</p>
                <table style="border-collapse:collapse;">
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Fecha</td><td style="padding:6px 12px;border:1px solid #ddd;">{formatted_date}</td></tr>
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Hora</td><td style="padding:6px 12px;border:1px solid #ddd;">{reserva['time']}</td></tr>
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Personas</td><td style="padding:6px 12px;border:1px solid #ddd;">{reserva['people']}</td></tr>
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">ID</td><td style="padding:6px 12px;border:1px solid #ddd;">#{reserva_id}</td></tr>
                </table>
                <p style="margin-top:20px;">Te esperamos en <strong>Av. San Martín 199, Casino Enjoy, Viña del Mar.</strong></p>
                <p style="color:#888;">Santerra Buffet</p>
                </body></html>"""
                msg.attach(MIMEText(message, 'plain', 'utf-8'))
                msg.attach(MIMEText(html, 'html', 'utf-8'))
                with smtplib.SMTP('smtp.gmail.com', 587) as server:
                    server.starttls()
                    server.login(email_user, email_pass)
                    server.sendmail(email_user, reserva['email'], msg.as_string())
                email_sent = True
                print(f'[EMAIL] Sent to {reserva["email"]}')
            except Exception as e:
                print(f'[EMAIL] Error sending to {reserva["email"]}: {e}')

        print(f'[RESERVA] #{reserva_id} - {reserva["name"]} - {reserva["date"]} {reserva["time"]} - {reserva["people"]} personas')

        response = {
            'success': True,
            'reserva': reserva,
            'email_sent': email_sent,
            'whatsapp_link': wa_link,
            'message': f'Reserva #{reserva_id} confirmada'
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode())
