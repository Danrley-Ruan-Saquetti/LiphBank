import { ZodValidatorAdapter } from '@adapters/validator'

export class UseCase {

  protected readonly validator = new ZodValidatorAdapter()
}