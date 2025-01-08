import { Listener, IListener, ListenerActionPerformed } from '@domain/adapters/observer/listener'

export type IEventsType = Record<string, any>

export type SubscriberListener<T = any> = Listener<T> | IListener<T> | ListenerActionPerformed<T>

export abstract class ObserverService<Events extends IEventsType = any> {

  abstract subscribe<EventName extends keyof Events>(event: EventName, listenerHandle: SubscriberListener<Events[EventName]>): Listener<Events[EventName]>
  abstract unsubscribe(listener: Listener): boolean
  abstract notify<EventName extends keyof Events>(event: EventName, data: Events[EventName]): Promise<void>
  abstract getListeners(): Listener[]
  abstract getListenersByEvent(event: keyof Events): Listener[]
}