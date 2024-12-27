import { UseCase } from '@application/use-cases/use-case'
import { NotificationCreateDTO, notificationCreateSchema } from '@application/dto/notification/create.dto'
import { Notification } from '@domain/entities/notification.entity'
import { NotificationRepository } from '@domain/repositories/notification.repository'

export class NotificationCreateUseCase extends UseCase {

  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {
    super()
  }

  async perform(args: NotificationCreateDTO) {
    const { body, subject, type } = this.validator.validate(notificationCreateSchema, args)

    const notification = Notification.load({
      body,
      subject,
      type
    })

    const notificationCreated = await this.notificationRepository.create(notification)

    return { notification: notificationCreated }
  }
}