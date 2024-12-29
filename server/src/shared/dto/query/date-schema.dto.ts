import { z } from 'zod'

const baseZodDate = z.coerce.date()

export const stringQuerySchema = () => z.object({
  eq: baseZodDate.optional(),
  dif: baseZodDate.optional(),
  gt: baseZodDate.optional(),
  gte: baseZodDate.optional(),
  lt: baseZodDate.optional(),
  lte: baseZodDate.optional(),
}).optional()