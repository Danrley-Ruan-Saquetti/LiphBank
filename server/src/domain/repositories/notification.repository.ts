import { Notification } from '@domain/entities/notification.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'

export type NotificationFilter = FilterSchema<Notification>
export type NotificationQueryArgs = QuerySchema<Notification>

export abstract class NotificationRepository {

  abstract create(notification: Notification): Promise<Notification>
  abstract update(id: number, notification: Notification): Promise<Notification>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<Notification | null>
  abstract findMany(args?: NotificationQueryArgs): Promise<Notification[]>
}