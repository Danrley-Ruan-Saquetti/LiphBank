import { FinancialTransaction } from '@domain/entities/financial-transaction.entity'

export interface FinancialTransactionCancelEvent {
  'events.financial-transaction.cancel': { financialTransaction: FinancialTransaction }
}