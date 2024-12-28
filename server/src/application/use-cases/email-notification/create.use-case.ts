import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { EmailNotificationCreateDTO, emailNotificationCreateSchema } from '@application/dto/email-notification/create.dto'
import { Notification } from '@domain/entities/notification.entity'
import { NotificationRepository } from '@domain/repositories/notification.repository'

@Injectable()
export class EmailNotificationCreateUseCase extends UseCase {

  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {
    super()
  }

  async perform(args: EmailNotificationCreateDTO) {
    const { body, subject, type } = this.validator.validate(emailNotificationCreateSchema, args)

    const notifications: Notification[] = []

    for (let i = 0; i < type.length; i++) {
      const notification = Notification.load({
        body,
        subject,
        type: type[i]
      })

      const notificationCreated = await this.notificationRepository.create(notification)

      notifications.push(notificationCreated)
    }

    return { notifications }
  }
}