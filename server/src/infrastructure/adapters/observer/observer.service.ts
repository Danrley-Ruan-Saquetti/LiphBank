import { HandlerListener, IEventsType, Listener, ObserverService } from '@domain/adapters/observer/observer.service'
import { uuidV4 } from '@shared/utils/uuid'

export class ObserverListenerImplementation<Events extends IEventsType = any> extends ObserverService<Events> {

  private readonly Listeners = new Map<keyof Events, Listener[]>()

  subscribe<EventName extends keyof Events>(event: EventName, handler: HandlerListener<any>) {
    const listeners = this.getListenersByEvent(event)

    const id = uuidV4()

    listeners.push({ id, event: event as string, handler })

    this.Listeners.set(event, listeners)

    return id
  }

  unsubscribe(id: string) {
    for (const [key, value] of this.Listeners.entries()) {
      const filteredArray = value.filter(item => item.id !== id)

      if (filteredArray.length !== value.length) {
        this.Listeners.set(key, filteredArray)

        return true
      }
    }

    return false
  }

  async notify<EventName extends keyof Events>(event: EventName, data: any) {
    const listeners = this.getListenersByEvent(event)

    for (let i = 0; i < listeners.length; i++) {
      await listeners[i].handler(data)
    }
  }

  getListeners() {
    return Array
      .from<any, Listener[]>(this.Listeners, ([_, handlers]) => handlers)
      .reduce((acc, handlers) => [...acc, ...handlers], [])
  }

  getListenersByEvent(event: keyof Events) {
    return this.Listeners.get(event) ?? []
  }
}