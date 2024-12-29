import { z } from 'zod'
import { BankAccountMessage } from '@application/messages/bank-account.message'

export const bankAccountQuerySchema = z.object({
  peopleId: z
    .coerce
    .number({ 'required_error': BankAccountMessage.peopleId.required })
    .int(),
})

export type BankAccountQueryDTO = z.input<typeof bankAccountQuerySchema>