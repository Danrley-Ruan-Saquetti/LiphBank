import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotificationCreateDTO, notificationCreateSchema } from '@application/dto/notification/create.dto'
import { Notification } from '@domain/entities/notification.entity'
import { NotificationRepository } from '@domain/repositories/notification.repository'

@Injectable()
export class NotificationCreateUseCase extends UseCase {

  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {
    super()
  }

  async perform(args: NotificationCreateDTO) {
    const { body, subject, type } = this.validator.validate(notificationCreateSchema, args)

    const notifications: Notification[] = []

    for (let i = 0; i < type.length; i++) {
      const notification = Notification.load({
        body,
        subject,
        type: type[0]
      })

      const notificationCreated = await this.notificationRepository.create(notification)

      notifications.push(notificationCreated)
    }

    return { notifications }
  }
}