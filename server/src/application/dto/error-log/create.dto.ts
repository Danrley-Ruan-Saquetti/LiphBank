import { z } from 'zod'
import { ErrorLogMessage } from '@application/messages/error-log.message'

export const errorLogCreateSchema = z.object({
  origin: z
    .string({ 'required_error': ErrorLogMessage.origin.required })
    .trim()
    .min(1, ErrorLogMessage.origin.required),
  message: z
    .string({ 'required_error': ErrorLogMessage.message.required })
    .trim()
    .min(1, ErrorLogMessage.message.required),
  details: z
    .any()
    .optional()
    .refine(val => !val || typeof val == 'object', ErrorLogMessage.details.invalidValue),
})

export type ErrorLogCreateDTO = z.input<typeof errorLogCreateSchema>