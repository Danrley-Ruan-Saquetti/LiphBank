import { z } from 'zod'
import { FinancialTransactionMessage } from '@application/messages/financial-transaction.message'
import { FinancialTransactionRule } from '@domain/rules/financial-transaction.rule'
import { FinancialTransactionTypeOccurrence } from '@domain/entities/financial-transaction.entity'

export const financialTransactionUpdateSchema = z.object({
  bankAccountId: z
    .coerce
    .number(),
  id: z
    .coerce
    .number(),
  title: z
    .string()
    .trim()
    .min(FinancialTransactionRule.title.minCharacters, { message: FinancialTransactionMessage.title.rangeCharacters })
    .max(FinancialTransactionRule.title.maxCharacters, { message: FinancialTransactionMessage.title.rangeCharacters })
    .optional(),
  description: z
    .string()
    .trim()
    .optional()
    .nullish(),
  isObservable: z
    .coerce
    .boolean()
    .optional(),
  isSendNotification: z
    .coerce
    .boolean()
    .optional(),
  timesToRepeat: z
    .coerce
    .number()
    .int()
    .nullish(),
  typeOccurrence: z
    .enum(FinancialTransactionRule.typeOccurrence.enum, {
      errorMap: () => ({ message: FinancialTransactionMessage.typeOccurrence.enumInvalid }),
    })
    .optional(),
  frequency: z
    .enum(FinancialTransactionRule.frequency.enum, {
      errorMap: () => ({ message: FinancialTransactionMessage.frequency.enumInvalid }),
    })
    .optional()
    .nullable(),
  senderRecipient: z
    .string()
    .trim()
    .min(1, FinancialTransactionMessage.senderRecipient.required)
    .optional(),
  expiresIn: z
    .coerce
    .date()
    .nullish(),
  dateTimeCompetence: z.coerce
    .date()
    .optional(),
})
  .transform(({ typeOccurrence, timesToRepeat, ...rest }) => {

    if (typeOccurrence == FinancialTransactionTypeOccurrence.SINGLE) {
      timesToRepeat = 0
    }

    return { ...rest, typeOccurrence, timesToRepeat }
  })

export type FinancialTransactionUpdateDTO = z.input<typeof financialTransactionUpdateSchema>