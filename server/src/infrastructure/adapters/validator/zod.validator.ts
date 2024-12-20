import { z } from 'zod'
import { Validator, ValidatorOptions } from '@domain/adapters/validator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ZodValidatorAdapterImplementation extends Validator {

  validate<T>(schema: z.ZodSchema<T>, args: any, options: ValidatorOptions = {}): T {
    const { success, data, error } = schema.safeParse(args)

    if (!success) {
      this.throwValidateError(error, options)
    }

    return data as T
  }

  private throwValidateError(err: any, options: ValidatorOptions = {}): never {
    if (!(err instanceof z.ZodError)) {
      if (options.debugLogError) {
        console.log(err)
      }
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

    throw ''
  }
}