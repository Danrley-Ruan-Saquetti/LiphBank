import { EmailNotification } from '@domain/entities/email-notification.entity'

export interface EmailNotificationSendEmailEvent {
  'events.email-notification.send.success': { emailNotification: EmailNotification }
  'events.email-notification.send.error': { emailNotification: EmailNotification, error: Error }
}