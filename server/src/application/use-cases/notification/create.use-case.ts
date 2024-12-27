import { UseCase } from '@application/use-cases/use-case'
import { NotificationRepository } from '@domain/repositories/notification.repository'

export class NotificationCreateUseCase extends UseCase {

  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {
    super()
  }

  async perform(args: any) {

  }
}