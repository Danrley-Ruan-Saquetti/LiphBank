import { Injectable } from '@nestjs/common'
import { BankAccountUpdateBalanceUseCase } from '@application/use-cases/bank-account/update-balance.use-case'
import { Listener } from '@domain/adapters/observer/listener'
import { FinancialTransactionType } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionCancelEvent } from '../events/financial-transaction/cancel.event'

@Injectable()
export class UpdateBalanceBankAccountListener extends Listener<FinancialTransactionCancelEvent['events.financial-transaction.cancel']> {

  constructor(
    private readonly bankAccountUpdateBalance: BankAccountUpdateBalanceUseCase
  ) {
    super()
  }

  async perform(data: FinancialTransactionCancelEvent['events.financial-transaction.cancel']) {
    const type = data.financialTransaction.type == FinancialTransactionType.INCOME ? 'IN' : 'OUT'

    await this.bankAccountUpdateBalance.perform({
      type,
      value: data.financialTransaction.value,
      bankAccountId: data.financialTransaction.bankAccountId,
    })
  }
}