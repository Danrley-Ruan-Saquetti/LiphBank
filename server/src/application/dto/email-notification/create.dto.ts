import { z } from 'zod'
import { EmailNotificationMessage } from '@application/messages/email-notification.message'
import { NotificationType } from '@domain/entities/notification.entity'

export const emailNotificationCreateSchema = z.object({
  subject: z
    .string({ 'required_error': EmailNotificationMessage.subject.required })
    .min(1, EmailNotificationMessage.subject.required),
  body: z
    .string({ 'required_error': EmailNotificationMessage.body.required })
    .min(1, EmailNotificationMessage.body.required),
  recipient: z
    .string({ 'required_error': EmailNotificationMessage.recipient.required })
    .min(1, EmailNotificationMessage.recipient.required),
  sender: z
    .string({ 'required_error': EmailNotificationMessage.sender.required })
    .min(1, EmailNotificationMessage.sender.required),
  type: z
    .union([
      z.array(
        z.nativeEnum(NotificationType, {
          errorMap: () => ({ message: EmailNotificationMessage.type.enumInvalid })
        })
      ).min(1, EmailNotificationMessage.type.required),
      z.nativeEnum(NotificationType, {
        errorMap: () => ({ message: EmailNotificationMessage.type.enumInvalid })
      }),
    ])
    .transform(val => Array.isArray(val) ? val : [val]),
})

export type EmailNotificationCreateDTO = z.input<typeof emailNotificationCreateSchema>