export type IEventsType = Record<string, any>

export type HandlerListener<TData = any> = (data: TData) => Promise<void | any> | void | any

export type Listener<TData = any> = {
  id: string
  event: string
  handler: HandlerListener<TData>
}

export interface IObservable<Events extends IEventsType = any> {
  subscribe<EventName extends keyof Events>(event: EventName, handler: HandlerListener<Events[EventName]>): string
  unsubscribe(id: string): boolean
  notify<EventName extends keyof Events>(event: EventName, data: Events[EventName]): Promise<void>
  getListeners(): Listener[]
  getListenersByEvent(event: keyof Events): Listener[]
}

export abstract class ObserverService<Events extends IEventsType = any> implements IObservable<Events> {

  abstract subscribe<EventName extends keyof Events>(event: EventName, handler: HandlerListener<Events[EventName]>): string
  abstract unsubscribe(id: string): boolean
  abstract notify<EventName extends keyof Events>(event: EventName, data: Events[EventName]): Promise<void>
  abstract getListeners(): Listener[]
  abstract getListenersByEvent(event: keyof Events): Listener[]
}