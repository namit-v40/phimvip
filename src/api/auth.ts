import http from '@/lib/http';
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType
} from '@/schema/auth.schema';
import { MessageResType } from '@/schema/common.schema';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/api/v1/auth/signin', body),
  register: (body: RegisterBodyType) => http.post<RegisterResType>('api/v1/auth/signup', body),
  auth: (body: { sessionToken: string; expiresAt: string, user: string, isAdmin: boolean }) => http.post('/api/auth', body, { baseUrl: '' }),
  logoutFromNextServerToServer: (sessionToken: string, lang: string) =>
    http.post<MessageResType>('api/v1/auth/signout',
      {lang},
      {
        headers: {'x-access-token': `${sessionToken}`}
      }
    ),
  logoutFromNextClientToNextServer: (
    lang: LogoutBodyType,
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) => http.post<MessageResType>('/api/auth/logout', { force, lang }, { baseUrl: '', signal }),
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      '/auth/slide-session',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  slideSessionFromNextClientToNextServer: () =>
    http.post<SlideSessionResType>(
      '/api/auth/slide-session',
      {},
      { baseUrl: '' }
    )
}

export default authApiRequest