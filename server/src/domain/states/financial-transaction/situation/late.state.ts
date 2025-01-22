import { InvalidStateException } from '@domain/exceptions/invalid-state.exception'
import { FinancialTransactionSituationState } from '@domain/states/financial-transaction/situation/situation.state'
import { FinancialTransactionSituation, FinancialTransactionType } from '@domain/entities/financial-transaction.entity'

export class FinancialTransactionLateState extends FinancialTransactionSituationState {

  pending() {
    if (this.financialTransaction.expiresIn && this.financialTransaction.expiresIn < new Date(Date.now())) {
      throw new InvalidStateException('It is not possible to make a Financial Transaction that is overdue as pending')
    }
  }

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

  late() { }

  cancel() {
    this.financialTransaction.situation = FinancialTransactionSituation.CANCELED
  }
}