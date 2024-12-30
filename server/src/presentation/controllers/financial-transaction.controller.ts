import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { BankAccount } from '@presentation/decorators/bank-account.decorator'
import { AuthUserGuard } from '@presentation/guards/auth-user.guard'
import { BankAccountSession } from '@presentation/types/bank-account-session.type'
import { AuthBankAccountGuard } from '@presentation/guards/auth-bank-account.guard'
import { FinancialTransactionCreateUseCase } from '@application/use-cases/financial-transaction/create.use-case'

@Controller('/bank-accounts/financial-transactions')
export class FinancialTransactionController {

  constructor(
    private readonly financialTransactionCreateUseCase: FinancialTransactionCreateUseCase
  ) { }

  @UseGuards(AuthUserGuard)
  @UseGuards(AuthBankAccountGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async create(@Body() body: any, @BankAccount() bankAccount: BankAccountSession) {
    await this.financialTransactionCreateUseCase.perform({ ...body, bankAccountId: bankAccount.id })

    return { message: 'Financial Transaction successfully created' }
  }
}