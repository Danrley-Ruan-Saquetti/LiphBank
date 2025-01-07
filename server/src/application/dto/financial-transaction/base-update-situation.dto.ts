import { z } from 'zod'
import { FinancialTransactionMessage } from '@application/messages/financial-transaction.message'

export const financialTransactionUpdateSituationSchema = z.object({
  bankAccountId: z
    .coerce
    .number({ 'required_error': FinancialTransactionMessage.bankAccountId.required }),
  financialTransactionId: z
    .coerce
    .number({ 'required_error': FinancialTransactionMessage.id.required }),
})