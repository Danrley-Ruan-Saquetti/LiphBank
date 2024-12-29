import { z } from 'zod'

const baseZodBoolean = z.coerce.boolean()

export const stringQuerySchema = z.object({
  eq: baseZodBoolean.optional(),
  dif: baseZodBoolean.optional(),
})