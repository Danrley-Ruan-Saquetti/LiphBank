import { RuntimeException } from '@shared/exceptions'

export class CodeGenerationFailedException extends RuntimeException {

  constructor() {
    super('Failed to generate a unique user code. Please try again')
  }
}