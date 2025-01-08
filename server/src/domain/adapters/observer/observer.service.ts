import { Listener } from '@domain/adapters/observer/listener'

export type IEventsType = Record<string, any>

export abstract class ObserverService<Events extends IEventsType = any> {

  abstract subscribe<EventName extends keyof Events>(event: EventName, listener: Listener<Events[EventName]>): Listener<Events[EventName]>
  abstract unsubscribe(id: string): boolean
  abstract notify<EventName extends keyof Events>(event: EventName, data: Events[EventName]): Promise<void>
  abstract getListeners(): Listener[]
  abstract getListenersByEvent(event: keyof Events): Listener[]
}