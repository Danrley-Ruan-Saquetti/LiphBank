import { Injectable } from '@nestjs/common'
import { BankAccountUpdateBalanceUseCase } from '@application/use-cases/bank-account/update-balance.use-case'
import { FinancialTransactionUpdateSituationEvent } from '@application/observer/events/financial-transaction/update-situation.event'
import { Listener } from '@domain/adapters/observer/listener'
import { FinancialTransactionSituation, FinancialTransactionType } from '@domain/enums/financial-transaction.enum'

@Injectable()
export class UpdateBalanceBankAccountListener extends Listener<FinancialTransactionUpdateSituationEvent['events.financial-transaction.update-situation']> {

  constructor(
    private readonly bankAccountUpdateBalance: BankAccountUpdateBalanceUseCase
  ) {
    super()
  }

  async perform(data: FinancialTransactionUpdateSituationEvent['events.financial-transaction.update-situation']) {
    const type = data.financialTransaction.type == FinancialTransactionType.INCOME ? 'IN' : 'OUT'

    await this.bankAccountUpdateBalance.perform({
      type,
      value: data.financialTransaction.value,
      bankAccountId: data.financialTransaction.bankAccountId,
    })
  }
}