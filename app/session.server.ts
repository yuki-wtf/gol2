import { createCookieSessionStorage } from '@remix-run/node'
import invariant from 'tiny-invariant'

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set')

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
})

const USER_SESSION_KEY = 'userId'

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

export async function getUserId(request: Request): Promise<string | null> {
  const session = await getSession(request)
  const userId = session.get(USER_SESSION_KEY) as string | undefined

  return userId ?? null
}

export async function updateSession({ request, userId }: { request: Request; userId: string | null }) {
  const session = await getSession(request)

  session.set(USER_SESSION_KEY, userId)

  return {
    'Set-Cookie': await sessionStorage.commitSession(session, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }),
  }
}
