import { z, ZodSchema } from 'zod'
import { CriticalException } from '../../core/exceptions/critical.exception'
import { ValidationException } from './validation.exception'

export type ZodValidatorOptions = {
  debugLogError?: boolean
}

export class ZodValidatorAdapter {
  validate<T>(schema: ZodSchema<T>, args: unknown, options: ZodValidatorOptions = {}): T {
    const { success, data, error } = schema.safeParse(args)

    if (!success) {
      this.throwValidateError(error, options)
    }

    return data
  }

  private throwValidateError(err: any, options: ZodValidatorOptions = {}) {
    if (!(err instanceof z.ZodError)) {
      if (options.debugLogError) {
        console.log(err)
      }

      throw new CriticalException(err.message)
    }

    const causes = err.issues.map(issue => ({
      message: issue.message,
      path: issue.path,
    }))

    if (options.debugLogError) {
      console.log({ causes })
    }

    throw new ValidationException('Invalid data', causes)
  }
}