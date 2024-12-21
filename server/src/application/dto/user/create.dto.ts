import { z } from 'zod'
import { UserMessage } from '@application/messages/user.message'
import { UserRule } from '@domain/rules/user.rule'
import { UserType } from '@domain/entities/user.entity'

export const userCreateSchema = z.object({
  peopleId: z
    .coerce
    .number({ 'required_error': UserMessage.peopleId.required })
    .int(),
  login: z
    .string({ 'required_error': UserMessage.login.required })
    .trim()
    .email({ message: UserMessage.login.valueInvalid }),
  password: z
    .string({ 'required_error': UserMessage.password.required })
    .trim()
    .regex(UserRule.password.regexp, { message: UserMessage.password.valueInvalid }),
  type: z
    .nativeEnum(UserType, { errorMap: () => ({ message: UserMessage.type.valueInvalid }) }),
})

export type UserCreateDTO = z.infer<typeof userCreateSchema>