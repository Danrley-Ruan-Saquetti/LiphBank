import { z } from 'zod'

export type ValidatorOptions = {
  debugLogError?: boolean
}

export abstract class Validator {

  abstract validate<Schema extends z.ZodSchema>(schema: Schema, args: unknown, options?: ValidatorOptions): z.output<Schema>
}