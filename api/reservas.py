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
            'status': 'pendiente',
            'created_at': datetime.now().isoformat()
        }

        date_obj = datetime.strptime(reserva['date'], '%Y-%m-%d')
        formatted_date = date_obj.strftime('%d/%m/%Y')
        bank_info = (
            'Datos para transferencia:\n'
            '- Nombre: Archie SPA\n'
            '- Banco: Santander\n'
            '- Cuenta Corriente: 0-000-9910355-8\n'
            '- RUT: 78.152.147-7\n'
            '- Correo: leogenovese.contacto@gmail.com'
        )
        message = (
            f'✨ Solicitud de Reserva - Santerra Buffet ✨\n'
            f'-----------------------------------\n'
            f'Nombre: {reserva["name"]}\n'
            f'Fecha: {formatted_date}\n'
            f'Hora: {reserva["time"]}\n'
            f'Personas: {reserva["people"]}\n'
            f'ID: #{reserva_id}\n\n'
            f'📌 Para CONFIRMAR tu reserva:\n'
            f'Debes abonar el 50% del valor total a:\n\n'
            f'{bank_info}\n\n'
            f'✅ Envía el comprobante de pago a este WhatsApp para confirmar.\n\n'
            f'Te esperamos en Av. San Martin 199, Casino Enjoy, Viña del Mar.'
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
                msg['Subject'] = f'Solicitud de Reserva - Santerra Buffet #{reserva_id}'
                html = f"""\
                <html><body style="font-family:sans-serif;padding:20px;max-width:600px;margin:0 auto;">
                <div style="background:#6B1C20;padding:20px;text-align:center;border-radius:12px 12px 0 0;">
                <h1 style="color:#fff;margin:0;font-size:22px;">Santerra Buffet</h1>
                </div>
                <div style="background:#fff;padding:30px;border:1px solid #eee;border-radius:0 0 12px 12px;">
                <h2 style="color:#6B1C20;margin-top:0;">Solicitud de Reserva</h2>
                <p>Hola <strong>{reserva['name']}</strong>,</p>
                <p>Recibimos tu solicitud con los siguientes datos:</p>
                <table style="border-collapse:collapse;width:100%;margin:16px 0;">
                <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9;">Fecha</td><td style="padding:8px 12px;border:1px solid #ddd;">{formatted_date}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9;">Hora</td><td style="padding:8px 12px;border:1px solid #ddd;">{reserva['time']}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9;">Personas</td><td style="padding:8px 12px;border:1px solid #ddd;">{reserva['people']}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9;">ID</td><td style="padding:8px 12px;border:1px solid #ddd;">#{reserva_id}</td></tr>
                </table>
                <div style="background:#fffbe6;border:1px solid #ffe58f;border-radius:8px;padding:16px;margin:16px 0;">
                <p style="margin:0 0 8px;font-weight:bold;color:#ad6800;">📌 Para CONFIRMAR tu reserva:</p>
                <p style="margin:0;color:#333;">Debes abonar el <strong>50% del valor total</strong> a la siguiente cuenta:</p>
                </div>
                <table style="border-collapse:collapse;width:100%;margin:16px 0;">
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Nombre</td><td style="padding:6px 12px;border:1px solid #ddd;">Archie SPA</td></tr>
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Banco</td><td style="padding:6px 12px;border:1px solid #ddd;">Santander</td></tr>
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Cuenta</td><td style="padding:6px 12px;border:1px solid #ddd;">0-000-9910355-8 (Corriente)</td></tr>
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">RUT</td><td style="padding:6px 12px;border:1px solid #ddd;">78.152.147-7</td></tr>
                <tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:bold;">Correo</td><td style="padding:6px 12px;border:1px solid #ddd;">leogenovese.contacto@gmail.com</td></tr>
                </table>
                <p style="margin-top:20px;">✅ Envía el comprobante de pago respondiendo este correo o por WhatsApp para confirmar tu reserva.</p>
                <p>Te esperamos en <strong>Av. San Martin 199, Casino Enjoy, Viña del Mar.</strong></p>
                <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
                <p style="color:#888;font-size:12px;text-align:center;">Santerra Buffet — Buffet Gourmet en Casino Enjoy Viña del Mar</p>
                </div>
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
            'message': f'Solicitud #{reserva_id} recibida. Revisa tu email con los datos para transferir el 50% y confirma enviando el comprobante por WhatsApp.'
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response, ensure_ascii=False).encode())
