import { FinancialTransaction, FinancialTransactionSituation } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionConcludeState } from '@domain/states/financial-transaction/situation/conclude.state'
import { FinancialTransactionLateState } from '@domain/states/financial-transaction/situation/late.state'
import { FinancialTransactionCancelState } from '@domain/states/financial-transaction/situation/cancel.state'
import { FinancialTransactionPendingState } from '@domain/states/financial-transaction/situation/pending.state'
import { IFinancialTransactionSituationState } from '@domain/states/financial-transaction/situation/situation.state'

export class FinancialTransactionSituationStateFabric {

  static getState(financialTransaction: FinancialTransaction): IFinancialTransactionSituationState {
    switch (financialTransaction.situation) {
      case FinancialTransactionSituation.CANCELED: return new FinancialTransactionCancelState(financialTransaction)
      case FinancialTransactionSituation.LATED: return new FinancialTransactionLateState(financialTransaction)
      case FinancialTransactionSituation.RECEIVED: return new FinancialTransactionConcludeState(financialTransaction)
      case FinancialTransactionSituation.PAID_OUT: return new FinancialTransactionConcludeState(financialTransaction)
      case FinancialTransactionSituation.PENDING:
      default: return new FinancialTransactionPendingState(financialTransaction)
    }
  }
}