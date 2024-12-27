import { z } from 'zod'

export const userGenerateCodeSchema = z.object({
  attempts: z
    .coerce
    .number()
    .int()
    .min(1, 'Number of attempts must be greater than 0 (zero)')
    .default(3)
})

export type UserGenerateCodeDTO = z.input<typeof userGenerateCodeSchema>