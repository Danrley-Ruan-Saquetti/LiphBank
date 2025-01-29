import { z } from 'zod'

export const querySchema = () => z.object({
  size: z.coerce.number().nonnegative().default(10),
  page: z.coerce.number().nonnegative().default(0),
})