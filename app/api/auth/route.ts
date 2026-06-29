import { cookies } from 'next/headers'
import { encrypt } from '@/lib/session'

export async function POST(request: Request) {
  const { code } = await request.json()

  if (!code || code !== process.env.ACCESS_CODE) {
    return Response.json({ error: 'Invalid access code' }, { status: 401 })
  }

  const session = await encrypt()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })

  return Response.json({ success: true })
}
