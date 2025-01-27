import { FinancialTransaction, FinancialTransactionSituation } from '@domain/entities/financial-transaction.entity'

export interface FinancialTransactionUpdateSituationEvent {
  'events.financial-transaction.update-situation': {
    financialTransaction: FinancialTransaction
    oldSituation: FinancialTransactionSituation
    newSituation: FinancialTransactionSituation
  }
}