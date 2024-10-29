export async function POST(request: Request) {
    const body = await request.json()
    const sessionToken = body.sessionToken as string
    const expiresAt = body.expiresAt as string
    const user = body.user as string
    const isAdmin = body.isAdmin as boolean
    
    if (!sessionToken) {
      return Response.json(
        { message: 'Không nhận được session token' },
        {
          status: 400
        }
      )
    }
    const expiresDate = new Date(expiresAt).toUTCString()
    
    const headers = new Headers()
    headers.append('Set-Cookie', `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`)
    headers.append('Set-Cookie', `user=${user}; Path=/`)
    if(isAdmin) headers.append('Set-Cookie', `isAdmin=true; Path=/`)

    return Response.json(body, {
      status: 200,
      headers
    })
  }  