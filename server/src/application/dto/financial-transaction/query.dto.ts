import { z } from 'zod'
import { FinancialTransactionMessage } from '@application/messages/financial-transaction.message'
import { querySchema } from '@shared/dto/query/query-schema.dto'
import { numberQuerySchema } from '@shared/dto/query/operator-schema.dto'

export const financialTransactionQuerySchema = querySchema().extend({
  bankAccountId: z
    .coerce
    .number({ 'required_error': FinancialTransactionMessage.bankAccountId.required })
    .int(),
  id: numberQuerySchema()
})

export type FinancialTransactionQueryDTO = z.input<typeof financialTransactionQuerySchema>