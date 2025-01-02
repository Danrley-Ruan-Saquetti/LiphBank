import { Inject } from '@nestjs/common'
import { ValidatorService } from '@domain/adapters/validator/validator.service'
import { HandlerListener, IEventsType, ObserverService } from '@domain/adapters/observer/observer.service'

export class UseCase<Events extends IEventsType = any> {

  @Inject(ValidatorService)
  protected validator: ValidatorService

  @Inject(ObserverService)
  protected observer: ObserverService<Events>

  subscribe<EventName extends keyof Events>(event: EventName, handler: HandlerListener<Events[EventName]>) {
    return this.observer.subscribe(event, handler)
  }

  unsubscribe(id: string) {
    return this.observer.unsubscribe(id)
  }

  protected async notify<EventName extends keyof Events>(event: EventName, data: Events[EventName]) {
    return await this.observer.notify(event, data)
  }

  getListeners() {
    return this.observer.getListeners()
  }

  getListenersByEvent(event: keyof Events) {
    return this.observer.getListenersByEvent(event)
  }
}