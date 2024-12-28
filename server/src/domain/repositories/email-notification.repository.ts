import { EmailNotification } from '@domain/entities/email-notification.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'

export type EmailNotificationFilter = FilterSchema<EmailNotification>
export type EmailNotificationQueryArgs = QuerySchema<EmailNotification>

export abstract class EmailNotificationRepository {

  abstract create(emailNotification: EmailNotification): Promise<EmailNotification>
  abstract update(id: number, emailNotification: EmailNotification): Promise<EmailNotification>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<EmailNotification | null>
  abstract findMany(args?: EmailNotificationQueryArgs): Promise<EmailNotification[]>
}