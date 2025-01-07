import { z } from 'zod'
import { financialTransactionUpdateSituationSchema } from '@application/dto/financial-transaction/base-update-situation.dto'

export const financialTransactionCancelSchema = financialTransactionUpdateSituationSchema.extend({})

export type FinancialTransactionCancelDTO = z.input<typeof financialTransactionCancelSchema>