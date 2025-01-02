import { Injectable } from '@nestjs/common'
import { ObserverService } from '@domain/adapters/observer/observer.service'

@Injectable()
export class ObserverEmitterService extends ObserverService {

  constructor(
  ) {
    super()
  }

  emit(event: string, data: any) {
  }
}