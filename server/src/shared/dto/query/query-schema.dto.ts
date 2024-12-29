import { z } from 'zod'

export const querySchema = z.object({
  pageSize: z.coerce.number().nonnegative().default(10),
  pageIndex: z.coerce.number().nonnegative().default(0),
})