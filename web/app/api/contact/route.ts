import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, service, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Navn og e-post er påkrevd' }, { status: 400 })
    }

    // ─── EMAIL SENDING ───
    // Option 1: Resend (recommended) – uncomment and install: npm i resend
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@straumeboligvent.no',
    //   to: process.env.CONTACT_EMAIL || 'service@straumetekniske.no',
    //   subject: `Ny forespørsel fra ${name}`,
    //   text: formatMessage({ name, phone, email, service, message }),
    // })

    // Option 2: Nodemailer – uncomment and install: npm i nodemailer @types/nodemailer
    // import nodemailer from 'nodemailer'
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT) || 587,
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // })
    // await transporter.sendMail({
    //   from: process.env.SMTP_USER,
    //   to: process.env.CONTACT_EMAIL || 'service@straumetekniske.no',
    //   subject: `Ny forespørsel fra ${name}`,
    //   text: formatMessage({ name, phone, email, service, message }),
    // })

    // For now: log to console (replace with real email provider)
    console.log('Contact form submission:', { name, phone, email, service, message })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Intern serverfeil' }, { status: 500 })
  }
}

function formatMessage({
  name,
  phone,
  email,
  service,
  message,
}: {
  name: string
  phone?: string
  email: string
  service?: string
  message?: string
}) {
  return [
    `Ny forespørsel fra straumeboligvent.no`,
    ``,
    `Navn: ${name}`,
    `Telefon: ${phone || '–'}`,
    `E-post: ${email}`,
    `Tjeneste: ${service || '–'}`,
    ``,
    `Melding:`,
    message || '(ingen melding)',
  ].join('\n')
}
