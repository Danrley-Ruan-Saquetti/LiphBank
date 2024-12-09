import { z } from 'zod'
import { CriticalException } from '../../core/exceptions/critical.exception'
import { ValidationException } from './validation.exception'

export type ZodValidatorOptions = {
  debugLogError?: boolean
}

export class ZodValidatorAdapter {
  validate<T>(schema: z.ZodSchema<T>, args: unknown, options: ZodValidatorOptions = {}): T {
    const { success, data, error } = schema.safeParse(args)

    if (!success) {
      this.throwValidateError(error, options)
    }

    return data as T
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
      path: [...issue.path, ...(issue.code == 'custom' ? [] : [issue.code])],
    }))

    if (options.debugLogError) {
      console.log({
        issues: err.issues.map(({ path, ...rest }) => ({ ...rest, path: path.join(', ') })),
        causes: causes.map(({ path, ...rest }) => ({ ...rest, path: path.join(', ') }))
      })
    }

    throw new ValidationException('Invalid data', causes)
  }
}