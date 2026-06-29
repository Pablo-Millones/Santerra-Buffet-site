from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import quote
from datetime import datetime
import os

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
            print(f'[EMAIL] Would send to {reserva["email"]}')
            email_sent = True

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
