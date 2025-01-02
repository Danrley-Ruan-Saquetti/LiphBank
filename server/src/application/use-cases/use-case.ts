import { Inject } from '@nestjs/common'
import { ObserverService } from '@domain/adapters/observer/observer.service'
import { ValidatorService } from '@domain/adapters/validator/validator.service'

export class UseCase {

  @Inject(ValidatorService)
  protected validator: ValidatorService

  @Inject(ObserverService)
  protected observer: ObserverService

}