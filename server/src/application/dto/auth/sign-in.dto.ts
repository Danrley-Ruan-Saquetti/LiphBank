import { z } from 'zod'
import { AuthMessage } from '@application/messages/auth.message'

export const authSignInSchema = z.object({
  login: z
    .string({ 'required_error': AuthMessage.login.required })
    .min(1, AuthMessage.login.required),
  password: z
    .string({ 'required_error': AuthMessage.password.required })
    .min(1, AuthMessage.password.required),
})

export type AuthSignInDTO = z.input<typeof authSignInSchema>