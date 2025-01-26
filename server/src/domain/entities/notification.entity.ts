import { Notification as NotificationPrisma } from '@prisma/client'
import { ObjectRequiredProps } from '@shared/types'

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

export type NotificationConstructor = ObjectRequiredProps<NotificationProps, 'type' | 'subject' | 'body'>

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

  constructor(props: NotificationConstructor) {
    this.id = props.id!
    this.type = props.type
    this.body = props.body
    this.subject = props.subject
    this.sendAt = props.sendAt || null
    this.situation = props.situation ?? NotificationSituation.IN_QUEUE
    this.createdAt = props.createdAt!
    this.updatedAt = props.updatedAt!
  }

  toJSON(): NotificationProps {
    return {
      id: this.id,
      type: this.type,
      body: this.body,
      sendAt: this.sendAt,
      situation: this.situation,
      subject: this.subject,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}