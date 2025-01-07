import { z } from 'zod'
import { financialTransactionUpdateSituationSchema } from '@application/dto/financial-transaction/base-update-situation.dto'

export const financialTransactionConcludeSchema = financialTransactionUpdateSituationSchema.extend({})

export type FinancialTransactionConcludeDTO = z.input<typeof financialTransactionConcludeSchema>