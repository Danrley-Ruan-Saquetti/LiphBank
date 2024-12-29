import { z } from 'zod'

const baseZodNumber = z.coerce.number()

export const numberQuerySchema = () => z.object({
  eq: baseZodNumber.optional(),
  dif: baseZodNumber.optional(),
  in: z.array(baseZodNumber).optional(),
  nin: z.array(baseZodNumber).optional(),
  gt: baseZodNumber.optional(),
  gte: baseZodNumber.optional(),
  lt: baseZodNumber.optional(),
  lte: baseZodNumber.optional(),
})