import { OnEvent } from '@nestjs/event-emitter'
import { Injectable } from '@nestjs/common'
import { UserCreatedEvent } from '@application/events/user/user-created.event'

@Injectable()
export class UserListener {

  @OnEvent(UserCreatedEvent.KEY_EVENT, { async: true })
  async userCreated(data: UserCreatedEvent) {
  }
}