import z from 'zod'

export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    user_name: z.string().trim().min(2).max(100),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    lang: z.string().min(2)
  })
  .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  data: z.object({
    accessToken: z.string(),
    expiresAt: z.string(),
    isAdmin: z.boolean(),
    account: z.object({
      user_id: z.number(),
      name: z.string(),
      user_name: z.string(),
      roles: z.string().array()
    })
  }),
  message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
  .object({
    user_name: z.string().trim().min(2).max(100),
    password: z.string().min(6).max(100),
    lang: z.string().min(2)
  })
.strict()

export const LogoutBody = z
  .object({
    lang: z.string().min(2)
  })
.strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>
export type LogoutBodyType = z.TypeOf<typeof LogoutBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>
export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
