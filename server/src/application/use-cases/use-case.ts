import { Inject } from '@nestjs/common'
import { ObserverService } from '@domain/adapters/observer/observer.service'
import { Validator } from '@domain/adapters/validator'

export class UseCase {

  @Inject(Validator)
  protected validator: Validator

  @Inject(ObserverService)
  protected observer: ObserverService

}