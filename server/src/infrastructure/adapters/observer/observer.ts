import { Injectable } from '@nestjs/common'
import { Listener, Observer } from '@domain/adapters/observer/observer'
import { uuidV4 } from '@shared/utils/uuid'

@Injectable()
export class ObserverService<Events extends Record<string, unknown> = any> extends Observer<Events> {

  protected listeners = new Map<keyof Events, Map<string, Listener>>()

  subscribe<Event extends keyof Events>(event: Event, handler: (data: Events[Event]) => Promise<void> | void) {
    const listeners = this.listeners.get(event) || new Map<string, Listener>()
    const id = uuidV4()

    listeners.set(id, { handler, id })
    this.listeners.set(event, listeners)

    return id
  }

  unsubscribe(id: string) {
    const listeners = this.listeners.values()

    for (const listenerMap of listeners) {
      listenerMap.delete(id)
    }
  }

  async notify<Event extends keyof Events>(event: Event, data: Events[Event]) {
    const listenersMap = this.listeners.get(event) || new Map<string, Listener>()

    if (!listenersMap.size) {
      return
    }

    const listeners = listenersMap.values()

    for (const listener of listeners) {
      await listener.handler(data)
    }
  }
}