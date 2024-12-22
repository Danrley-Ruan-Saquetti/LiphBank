import { Validator } from '@domain/adapters/validator'
import { Inject } from '@nestjs/common'

export class UseCase {

  @Inject(Validator)
  protected validator: Validator
}