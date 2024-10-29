import authApiRequest from '@/api/auth'
import { HttpError } from '@/lib/http'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const res = await request.json()
  const force = res.force as boolean | undefined
  const lang = res.lang.lang as string;

  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const isAdmin = cookieStore.get('isAdmin')

  const headers = new Headers()
  headers.append('Set-Cookie', `sessionToken=; Path=/; HttpOnly; Max-Age=0`)
  headers.append('Set-Cookie', `user=; Path=/; Max-Age=0`)
  if(isAdmin) headers.append('Set-Cookie', `isAdmin=; Path=/; Max-Age=0`)

  if (force) {
    return Response.json(
      {
        message: 'Buộc đăng xuất thành công'
      },
      {
        status: 200,
        headers
      }
    )
  }

  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được session token' },
      { status: 401 }
    )
  }
  try {
    const result = await authApiRequest.logoutFromNextServerToServer(sessionToken.value, lang)

    return Response.json(result.payload, {
      status: 200,
      headers
    })
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        { message: 'Lỗi không xác định' },
        { status: 500 }
      )
    }
  }
}