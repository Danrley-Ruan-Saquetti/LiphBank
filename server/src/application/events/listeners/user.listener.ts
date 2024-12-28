import { OnEvent } from '@nestjs/event-emitter'
import { Injectable } from '@nestjs/common'
import { UserCreatedEvent } from '@application/events/user/user-created.event'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
import { NotificationType } from '@domain/entities/notification.entity'

@Injectable()
export class UserListener {

  constructor(
    private readonly notificationCreateUseCase: EmailNotificationCreateUseCase
  ) { }

  @OnEvent(UserCreatedEvent.KEY_EVENT, { async: true })
  async userCreated({ user, people }: UserCreatedEvent) {
    await this.notificationCreateUseCase.perform({
      subject: 'LiphBank - New account created',
      body: `Hello ${people.name}.\nNew user created with login ${user.login} - Code: ${user.code}`,
      type: NotificationType.EMAIL
    })
  }
}