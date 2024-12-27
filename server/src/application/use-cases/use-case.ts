import { Inject } from '@nestjs/common'
import { Validator } from '@domain/adapters/validator'
import { IObservable, ListenerHandler, Observer } from '@domain/adapters/observer/observer'

export class UseCase<Events extends Record<string, unknown> = any> implements IObservable<Events> {

  @Inject(Validator)
  protected validator: Validator

  @Inject(Observer)
  private observer: Observer<Events>

  subscribe<Event extends keyof Events>(event: Event, handler: ListenerHandler<Events[Event]>) {
    return this.observer.subscribe(event, handler)
  }

  unsubscribe(id: string) {
    this.observer.unsubscribe(id)
  }

  async notify<Event extends keyof Events>(event: Event, data: Events[Event]) {
    await this.observer.notify(event, data)
  }
}