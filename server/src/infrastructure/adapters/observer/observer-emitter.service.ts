import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ObserverService } from '@domain/adapters/observer/observer.service'

@Injectable()
export class ObserverEmitterService extends ObserverService {

  constructor(
    private readonly eventEmitter: EventEmitter2
  ) {
    super()
  }

  emit(event: string, data: any) {
    this.eventEmitter.emit(event, data)
  }
}