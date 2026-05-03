/**
 * Vercel Function (Web fetch handler) — trimite solicitarea prin SendGrid v3.
 *
 * Variabile de mediu (Vercel → Project → Settings → Environment Variables):
 *   SENDGRID_API_KEY     — API Key cu permisiune „Mail Send”
 *   SENDGRID_FROM_EMAIL  — expeditor verificat în SendGrid
 *   SENDGRID_TO_EMAIL    — opțional; implicit internationaltmp@gmail.com
 */

const DEFAULT_TO = 'internationaltmp@gmail.com';
const MAX_LEN = 4000;

function clip(s) {
  if (s == null) return '';
  const t = String(s).trim();
  return t.length > MAX_LEN ? t.slice(0, MAX_LEN) + '…' : t;
}

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, error: 'Method not allowed' }, 405, { Allow: 'POST' });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    const toEmail = process.env.SENDGRID_TO_EMAIL || DEFAULT_TO;

    if (!apiKey || !fromEmail) {
      return jsonResponse(
        {
          ok: false,
          error:
            'Trimiterea automată nu este configurată. Adăugați SENDGRID_API_KEY și SENDGRID_FROM_EMAIL în Vercel.',
        },
        503
      );
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: 'Date invalide' }, 400);
    }

    if (!data || typeof data !== 'object') {
      return jsonResponse({ ok: false, error: 'Date invalide' }, 400);
    }

    const fields = {
      tip_transport: clip(data.tip_transport),
      plecare: clip(data.plecare),
      destinatie: clip(data.destinatie),
      detalii_masina: clip(data.detalii_masina),
      data_transport: clip(data.data_transport),
      telefon: clip(data.telefon),
      email: clip(data.email),
      mesaj: clip(data.mesaj),
      sunet_rapid: data.sunet_rapid === 'Da' || data.sunet_rapid === true ? 'Da' : 'Nu',
    };

    const required = [
      'tip_transport',
      'plecare',
      'destinatie',
      'detalii_masina',
      'data_transport',
      'telefon',
      'email',
    ];
    for (const k of required) {
      if (!fields[k]) {
        return jsonResponse({ ok: false, error: 'Completați toate câmpurile obligatorii.' }, 400);
      }
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(fields.email)) {
      return jsonResponse({ ok: false, error: 'Adresa de email nu este validă.' }, 400);
    }

    const textBody =
      `SOLICITARE COTAȚIE DE PREȚ\n\n` +
      `Tip transport: ${fields.tip_transport}\n` +
      `Plecare: ${fields.plecare}\n` +
      `Destinație: ${fields.destinatie}\n` +
      `Detalii mașină: ${fields.detalii_masina || '—'}\n` +
      `Termen / dată: ${fields.data_transport}\n` +
      `Telefon: ${fields.telefon}\n` +
      `Email client: ${fields.email}\n` +
      `Vreau să fiu sunat rapid: ${fields.sunet_rapid}\n\n` +
      `Mesaj (opțional):\n${fields.mesaj || '—'}`;

    const payload = {
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: fromEmail },
      reply_to: { email: fields.email },
      subject: 'Solicitare cotație de preț — TMP International',
      content: [{ type: 'text/plain', value: textBody }],
    };

    try {
      const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!sgRes.ok) {
        const errText = await sgRes.text();
        console.error('SendGrid error', sgRes.status, errText.slice(0, 500));
        return jsonResponse(
          {
            ok: false,
            error:
              'Serviciul de email a refuzat trimiterea. Încercați din nou sau contactați-ne la telefon.',
          },
          502
        );
      }

      return jsonResponse({ ok: true }, 200);
    } catch (e) {
      console.error(e);
      return jsonResponse(
        {
          ok: false,
          error: 'Nu s-a putut conecta la serviciul de email. Încercați din nou.',
        },
        502
      );
    }
  },
};
