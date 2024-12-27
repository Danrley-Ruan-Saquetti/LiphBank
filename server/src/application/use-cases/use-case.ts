import { Inject } from '@nestjs/common'
import { Observer } from '@domain/adapters/observer/observer'
import { Validator } from '@domain/adapters/validator'

export class UseCase {

  @Inject(Validator)
  protected validator: Validator

  @Inject(Observer)
  protected observer: Observer

}