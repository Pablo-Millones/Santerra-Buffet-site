module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const WHATSAPP_NUMBER = '56935621667';

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const reservaId = Date.now().toString(36).toUpperCase();

      const reserva = {
        id: reservaId,
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        date: body.date || '',
        time: body.time || '',
        people: body.people || 0,
        status: 'confirmada',
        created_at: new Date().toISOString()
      };

      const dateObj = new Date(reserva.date + 'T00:00:00');
      const formattedDate = dateObj.toLocaleDateString('es-CL');
      const message = [
        `Hola ${reserva.name}, tu reserva en Santerra Buffet esta confirmada:`,
        `Fecha: ${formattedDate}`,
        `Hora: ${reserva.time}`,
        `Personas: ${reserva.people}`,
        `ID: #${reserva.id}`,
        '',
        'Te esperamos! Avenida San Martin 199, Casino Enjoy.'
      ].join('\n');

      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      let emailSent = false;
      const EMAIL_USER = process.env.EMAIL_USER;
      const EMAIL_PASS = process.env.EMAIL_PASS;

      if (reserva.email && EMAIL_USER && EMAIL_PASS) {
        try {
          console.log(`[EMAIL] Would send to ${reserva.email}`);
          emailSent = true;
        } catch (e) {
          console.error('[EMAIL] Error:', e);
        }
      }

      console.log(`[RESERVA] #${reservaId} - ${reserva.name} - ${reserva.date} ${reserva.time} - ${reserva.people} personas`);

      return res.status(200).json({
        success: true,
        reserva: reserva,
        email_sent: emailSent,
        whatsapp_link: waLink,
        message: `Reserva #${reservaId} confirmada`
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ message: 'API de reservas Santerra Buffet' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
