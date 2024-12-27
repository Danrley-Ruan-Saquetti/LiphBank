import { z } from 'zod'
import { BankAccountMessage } from '@application/messages/bank-account.message'
import { BankAccountRule } from '@domain/rules/bank-account.rule'

export const bankAccountSchemaCreate = z.object({
  peopleId: z
    .coerce
    .number()
    .int(),
  name: z
    .string({ 'required_error': BankAccountMessage.name.required })
    .trim()
    .min(BankAccountRule.minCharacters, { message: BankAccountMessage.name.rangeCharacters })
    .max(BankAccountRule.maxCharacters, { message: BankAccountMessage.name.rangeCharacters }),
})

export type BankAccountCreateDTO = z.input<typeof bankAccountSchemaCreate>