import { z } from 'zod'

const baseZodString = z.string()

export const stringQuerySchema = () => z.object({
  eq: baseZodString.optional(),
  dif: baseZodString.optional(),
  in: z.array(baseZodString).optional(),
  nin: z.array(baseZodString).optional(),
  sw: baseZodString.optional(),
  ew: baseZodString.optional(),
})