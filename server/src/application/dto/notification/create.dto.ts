import { z } from 'zod'
import { NotificationMessage } from '@application/messages/notification.message'
import { NotificationType } from '@domain/entities/notification.entity'

export const notificationCreateSchema = z.object({
  subject: z
    .string({ 'required_error': NotificationMessage.subject.required })
    .min(1, NotificationMessage.subject.required),
  body: z
    .string({ 'required_error': NotificationMessage.body.required })
    .min(1, NotificationMessage.body.required),
  type: z
    .nativeEnum(NotificationType, {
      errorMap: () => ({ message: NotificationMessage.type.enumInvalid })
    }),
})

export type NotificationCreateDTO = z.input<typeof notificationCreateSchema>