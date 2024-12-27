import { DataEvent } from '@application/events/event'
import { User } from '@domain/entities/user.entity'
import { People } from '@domain/entities/people.entity'

export class UserCreatedEvent extends DataEvent {

  constructor(
    public readonly user: User,
    public readonly people: People
  ) {
    super()
  }

  static KEY_EVENT = 'user.created'
}