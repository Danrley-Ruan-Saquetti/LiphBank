import { Injectable } from '@nestjs/common'
import { z } from 'zod'

export type ValidatorOptions = {
  debugLogError?: boolean
}

export abstract class Validator {

  abstract validate<T>(schema: z.ZodSchema<T>, args: any, options?: ValidatorOptions): T
}