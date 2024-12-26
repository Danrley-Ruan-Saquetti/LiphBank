import { RuntimeException } from '@shared/exceptions'

export class CodeGenerationFailedException extends RuntimeException {

  constructor(resource: string) {
    super(`Failed to generate a unique ${resource} code. Please try again`)
  }
}