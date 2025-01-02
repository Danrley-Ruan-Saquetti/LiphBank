export type IEventsType = Record<string, any>

export type HandlerListener<TData = any> = (data: TData) => Promise<void | any> | void | any

export type Listener<TData = any> = {
  id: string
  event: string
  handler: HandlerListener<TData>
}

export abstract class ObserverService<Events extends IEventsType = any> {

  abstract subscribe<EventName extends keyof Events>(event: EventName, handler: HandlerListener<Events[EventName]>): string
  abstract unsubscribe(id: string): boolean
  abstract notify<EventName extends keyof Events>(event: EventName, data: Events[EventName]): Promise<void>
  abstract getListeners(): Listener[]
  abstract getListenersByEvent(event: keyof Events): Listener[]
}