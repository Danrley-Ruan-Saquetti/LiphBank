import { FilterSchema, QuerySchema } from '@domain/adapters/database/filters'
import { Notification, NotificationProps } from '@domain/entities/notification.entity'

type NotificationFilterArgs = NotificationProps

export type NotificationFilter = FilterSchema<NotificationFilterArgs>
export type NotificationQueryArgs = QuerySchema<NotificationFilterArgs>

export abstract class NotificationRepository {

  abstract create(notification: Notification): Promise<Notification>
  abstract update(id: number, notification: Notification): Promise<Notification>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<Notification | null>
  abstract findMany(args?: NotificationQueryArgs): Promise<Notification[]>
}