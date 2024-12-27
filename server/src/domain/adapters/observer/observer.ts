
export type ListenerHandler<T = any> = (data: T) => Promise<void> | void

export interface Listener<T = any> {
  id: string
  handler: ListenerHandler<T>
}

export interface IObservable<Events extends Record<string, unknown> = any> {
  subscribe<Event extends keyof Events>(event: Event, handler: ListenerHandler<Events[Event]>): string
  unsubscribe(id: string): void
  notify<Event extends keyof Events>(event: Event, data: Events[Event]): Promise<void>
}

export abstract class Observer<Events extends Record<string, unknown> = any> implements IObservable<Events> {

  protected listeners = new Map<keyof Events, Map<string, Listener>>()

  abstract subscribe<Event extends keyof Events>(event: Event, handler: ListenerHandler<Events[Event]>): string
  abstract unsubscribe(id: string): void
  abstract notify<Event extends keyof Events>(event: Event, data: Events[Event]): Promise<void>
}