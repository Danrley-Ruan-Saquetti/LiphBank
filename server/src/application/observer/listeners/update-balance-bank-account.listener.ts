import { Injectable } from '@nestjs/common'
import { BankAccountUpdateBalanceUseCase } from '@application/use-cases/bank-account/update-balance.use-case'
import { FinancialTransaction, FinancialTransactionType } from '@domain/entities/financial-transaction.entity'

@Injectable()
export class UpdateBalanceBankAccountListener {

  constructor(
    private readonly bankAccountUpdateBalance: BankAccountUpdateBalanceUseCase
  ) { }

  async perform(data: { financialTransaction: FinancialTransaction }) {
    const type = data.financialTransaction.type == FinancialTransactionType.INCOME ? 'IN' : 'OUT'

    await this.bankAccountUpdateBalance.perform({
      type,
      value: data.financialTransaction.value,
      bankAccountId: data.financialTransaction.bankAccountId,
    })
  }
}