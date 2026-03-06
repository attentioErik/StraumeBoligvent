import { NextResponse } from 'next/server'

const PASSWORD = 'boligvent_26'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Feil passord' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('site_auth', 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return res
}
