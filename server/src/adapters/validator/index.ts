import { z, ZodSchema } from 'zod'
import { CriticalException } from '../../exceptions/critical.exception'
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
    if (options.debugLogError) {
      console.log({ ...err })
    }

    if (!(err instanceof z.ZodError)) {
      throw new CriticalException(err.message)
    }

    const causes = err.flatten(issue => ({
      message: issue.message,
      path: issue.path.join('.'),
    }))

    throw new ValidationException('Invalid data', causes.formErrors)
  }
}