import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Observer } from '@domain/adapters/observer/observer'

@Injectable()
export class ObserverEmitterService extends Observer {

  constructor(
    private readonly eventEmitter: EventEmitter2
  ) {
    super()
  }

  emit(event: string, data: any) {
    this.eventEmitter.emit(event, data)
  }
}