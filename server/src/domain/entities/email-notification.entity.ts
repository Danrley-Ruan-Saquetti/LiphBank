import { Email as EmailPrisma } from '@prisma/client'
import { Notification, NotificationProps } from '@domain/entities/notification.entity'

export type EmailNotificationProps = EmailPrisma

export class EmailNotification extends Notification implements EmailNotificationProps {

  private _recipient: string
  private _sender: string

  get recipient() { return this._recipient }
  get sender() { return this._sender }

  set recipient(value) { this._recipient = value }
  set sender(value) { this._sender = value }

  static load(props: Partial<EmailNotificationProps> & Partial<NotificationProps>) {
    const emailNotification = super.load({ ...props }) as EmailNotification

    if (props.recipient) emailNotification.recipient = props.recipient
    if (props.sender) emailNotification.sender = props.sender

    return emailNotification
  }

  toJSON(): EmailNotificationProps & NotificationProps {
    return {
      ...super.toJSON(),
      id: this.id,
      recipient: this.recipient,
      sender: this.sender,
    }
  }
}