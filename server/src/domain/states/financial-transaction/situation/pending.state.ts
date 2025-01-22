import { FinancialTransactionSituation, FinancialTransactionType } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionSituationState } from '@domain/states/financial-transaction/situation/situation.state'

export class FinancialTransactionPendingState extends FinancialTransactionSituationState {

  pending() { }

  conclude() {
    let situation: FinancialTransactionSituation

    if (this.financialTransaction.type == FinancialTransactionType.EXPENSE) {
      situation = FinancialTransactionSituation.PAID_OUT
    }
    else {
      situation = FinancialTransactionSituation.RECEIVED
    }

    this.financialTransaction.situation = situation
  }

  late() {
    this.financialTransaction.situation = FinancialTransactionSituation.LATED
  }

  cancel() {
    this.financialTransaction.situation = FinancialTransactionSituation.CANCELED
  }
}