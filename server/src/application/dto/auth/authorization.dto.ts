import { z } from 'zod'

export const authAuthorizationSchema = z.object({
  token: z
    .string()
    .trim()
})

export type AuthAuthorizationDTO = z.input<typeof authAuthorizationSchema>