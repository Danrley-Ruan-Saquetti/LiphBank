import { Inject, OnModuleInit } from '@nestjs/common'
import { ValidatorService } from '@domain/adapters/validator/validator.service'
import { HandlerListener, IEventsType, ObserverService } from '@domain/adapters/observer/observer.service'

export class UseCase<Events extends IEventsType = any> implements OnModuleInit {

  @Inject(ValidatorService)
  protected validator: ValidatorService

  @Inject(ObserverService)
  private _observer: ObserverService<Events>

  get observer() {
    return {
      subscribe: <EventName extends keyof Events>(event: EventName, handler: HandlerListener<Events[EventName]>) => this._observer.subscribe(event, handler),
      unsubscribe: (id: string) => this._observer.unsubscribe(id),
      notify: async<EventName extends keyof Events>(event: EventName, data: Events[EventName]) => await this._observer.notify(event, data),
      getListeners: () => this._observer.getListeners(),
      getListenersByEvent: (event: keyof Events) => this._observer.getListenersByEvent(event)
    }
  }

  onModuleInit() { }
}