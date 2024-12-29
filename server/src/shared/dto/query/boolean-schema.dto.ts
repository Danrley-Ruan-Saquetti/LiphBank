import { z } from 'zod'

const baseZodBoolean = z.coerce.boolean()

export const booleanQuerySchema = () => z.object({
  eq: baseZodBoolean.optional(),
  dif: baseZodBoolean.optional(),
}).optional()