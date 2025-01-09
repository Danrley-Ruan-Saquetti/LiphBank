import { Listener } from '@domain/adapters/observer/listener'
import { IListener, ListenerActionPerformed } from '@domain/adapters/observer/interfaces'

export type SubscriberListener<T = any> = Listener<T> | IListener<T> | ListenerActionPerformed<T>

export interface IPublisher<Events extends IEventsType = any> {
  subscribe<EventName extends keyof Events>(event: EventName, listenerHandle: SubscriberListener<Events[EventName]>): Listener<Events[EventName]>
  unsubscribe(listener: Listener): boolean
  notify<EventName extends keyof Events>(event: EventName, data: Events[EventName]): Promise<void>
}