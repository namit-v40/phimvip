import envConfig from '@/config';
import { normalizePath } from '@/lib/utils';
import { LoginResType } from '@/schema/auth.schema';
import { redirect } from 'next/navigation';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 400
const AUTHENTICATION_ERROR_STATUS = 401
const FORBIDDEN_ERROR_STATUS = 403

type EntityErrorPayload = {
  field: string
  message: string
  errors: {
    field: string
    message: string
  }[]
}

type AuthenticationErrorPayload = {
  field: string
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 400
  payload: EntityErrorPayload
  constructor({
    status,
    payload
  }: {
    status: 400
    payload: EntityErrorPayload
  }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

export class AuthenticationError extends HttpError {
  status: 401
  payload: AuthenticationErrorPayload
  constructor(
    { status, payload }: 
    {
      status: 401
      payload: AuthenticationErrorPayload
    }
  ) {
      super({ status, payload })
      this.status = status
      this.payload = payload
    }
}

let clientLogoutRequest: null | Promise<any> = null

export const isClient = () => typeof window !== 'undefined';

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
  let body: FormData | string | undefined = undefined
  
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeaders: { [key: string]: string } = body instanceof FormData
    ? 
    {}
    : 
    { 
      'Content-Type': 'application/json' 
    }

  if (isClient()) {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      baseHeaders['x-access-token'] = sessionToken;
    }
  }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    body,
    method
  })
  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }
  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 400
          payload: EntityErrorPayload
        }
      )
    } else if(res.status === AUTHENTICATION_ERROR_STATUS){
      throw new AuthenticationError(
        data as {
          status: 401
          payload: AuthenticationErrorPayload
        }
      )
    }
    else if (res.status === FORBIDDEN_ERROR_STATUS) {
      if (isClient()) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders
            } as any
          })
          try {
            await clientLogoutRequest
          } catch (error) {
            console.log(error)
          } finally {
            localStorage.removeItem('sessionToken')
            localStorage.removeItem('sessionTokenExpiresAt')
            clientLogoutRequest = null
            location.href = '/login'
          }
        }
      } else {
        const sessionToken = (options?.headers as any)?.['x-access-token']
        redirect(`/logout?sessionToken=${sessionToken}`)
      }
    } else {
      console.log("loi o day");
      
      throw new HttpError(data)
    }
  }
  // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (isClient()) {
    if (['api/v1/auth/signin'].some((item) => item === normalizePath(url))) {
      const { accessToken, expiresAt } = (payload as LoginResType).data
      localStorage.setItem('sessionToken', accessToken)
      localStorage.setItem('sessionTokenExpiresAt', expiresAt)
    } else if ('api/v1/auth/signout' === normalizePath(url)) {
      localStorage.removeItem('sessionToken')
      localStorage.removeItem('sessionTokenExpiresAt')
    }
  }
  return data
}

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options })
  }
}

export default http