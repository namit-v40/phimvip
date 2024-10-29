import z from 'zod';

export const AccountRes = z
  .object({
    data: z.object({
      user_id: z.number(),
      name: z.string(),
      user_name: z.string(),
      roles: z.string().array()
    }),
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256)
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>