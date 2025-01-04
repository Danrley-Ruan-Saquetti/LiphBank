import { NotificationProps } from '@domain/entities/notification.entity'
import { FilterSchema, QuerySchema } from '@domain/adapters/database/filters'
import { EmailNotification, EmailNotificationProps } from '@domain/entities/email-notification.entity'

interface EmailNotificationFilterArgs extends EmailNotificationProps {
  notification: NotificationProps
}

export type EmailNotificationFilter = FilterSchema<EmailNotificationFilterArgs>
export type EmailNotificationQueryArgs = QuerySchema<EmailNotificationFilterArgs>

export abstract class EmailNotificationRepository {

  abstract create(emailNotification: EmailNotification): Promise<EmailNotification>
  abstract update(id: number, emailNotification: EmailNotification): Promise<EmailNotification>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<EmailNotification | null>
  abstract findMany(args?: EmailNotificationQueryArgs): Promise<EmailNotification[]>
}