import { z, ZodError, ZodSchema } from 'zod'

export class ZodValidatorAdapter {
  validate<T>(schema: ZodSchema<T>, data: unknown): T {
    try {
      const result = schema.parse(data)

      return result
    } catch (err: any) {
      return err.flatten(issue => {
        return {
          message: issue.message,
          errorCode: issue.code,
          path: issue.path.join('.'),
        }
      })
    }
  }
}