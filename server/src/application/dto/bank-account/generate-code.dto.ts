import { z } from 'zod'

export const bankAccountGenerateCodeSchema = z.object({
  attempts: z
    .number()
    .int()
    .min(1, 'Number of attempts must be greater than 0 (zero)')
    .default(3)
})

export type BankAccountGenerateCodeDTO = z.input<typeof bankAccountGenerateCodeSchema>