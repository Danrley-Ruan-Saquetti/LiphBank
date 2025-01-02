import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { EmailNotificationCreateDTO, emailNotificationCreateSchema } from '@application/dto/email-notification/create.dto'
import { EmailNotification } from '@domain/entities/email-notification.entity'
import { EmailNotificationRepository } from '@domain/repositories/email-notification.repository'

@Injectable()
export class EmailNotificationCreateUseCase extends UseCase {

  constructor(
    private readonly emailNotificationRepository: EmailNotificationRepository
  ) {
    super()
  }

  async perform(args: EmailNotificationCreateDTO) {
    const { body, subject, type, sender, recipient } = this.validator.validate(emailNotificationCreateSchema, args)

    const notifications: EmailNotification[] = []

    for (let i = 0; i < type.length; i++) {
      const notification = EmailNotification.load({
        body,
        subject,
        sender,
        recipient,
        type: type[i],
      })

      const notificationCreated = await this.emailNotificationRepository.create(notification)

      notifications.push(notificationCreated)
    }

    return { notifications }
  }
}