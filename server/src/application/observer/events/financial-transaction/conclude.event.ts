import { FinancialTransaction } from '@domain/entities/financial-transaction.entity'

export interface FinancialTransactionConcludeEvent {
  'events.financial-transaction.conclude': { financialTransaction: FinancialTransaction }
}