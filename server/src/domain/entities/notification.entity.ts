import { Notification as NotificationPrisma } from '@prisma/client'

export enum NotificationSituation {
  IN_QUEUE = 'IQ',
  ERROR = 'ER',
  SENT = 'SN',
}

export enum NotificationType {
  PUSH = 'P',
  INTERNAL = 'I',
  EMAIL = 'E',
}

export interface NotificationProps extends NotificationPrisma {
  type: NotificationType
  situation: NotificationSituation
}

export class Notification implements NotificationProps {

  private _type: NotificationType
  private _situation: NotificationSituation
  private _id: number
  private _subject: string
  private _body: string
  private _sendAt: Date | null
  private _createdAt: Date
  private _updatedAt: Date

  get type() { return this._type }
  get situation() { return this._situation }
  get id() { return this._id }
  get subject() { return this._subject }
  get body() { return this._body }
  get sendAt() { return this._sendAt }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  set type(value) { this._type = value }
  set situation(value) { this._situation = value }
  set id(value) { this._id = value }
  set subject(value) { this._subject = value }
  set body(value) { this._body = value }
  set sendAt(value) { this._sendAt = value }
  set createdAt(value) { this._createdAt = value }
  set updatedAt(value) { this._updatedAt = value }

  static load(props: Partial<NotificationProps>) {
    const notification = new Notification()

    if (props.id) notification.id = props.id
    if (props.type) notification.type = props.type
    if (props.body) notification.body = props.body
    if (props.sendAt) notification.sendAt = props.sendAt
    if (props.situation) notification.situation = props.situation
    if (props.subject) notification.subject = props.subject
    if (props.createdAt) notification.createdAt = props.createdAt
    if (props.updatedAt) notification.updatedAt = props.updatedAt

    return notification
  }
}