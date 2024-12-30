import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common'
import { BankAccount } from '@presentation/decorators/bank-account.decorator'
import { AuthUserGuard } from '@presentation/guards/auth-user.guard'
import { BankAccountSession } from '@presentation/types/bank-account-session.type'
import { AuthBankAccountGuard } from '@presentation/guards/auth-bank-account.guard'
import { FinancialTransactionQueryUseCase } from '@application/use-cases/financial-transaction/query.use-case'
import { FinancialTransactionCreateUseCase } from '@application/use-cases/financial-transaction/create.use-case'

@Controller('/bank-accounts/financial-transactions')
export class FinancialTransactionController {

  constructor(
    private readonly financialTransactionCreateUseCase: FinancialTransactionCreateUseCase,
    private readonly financialTransactionQueryUseCase: FinancialTransactionQueryUseCase,
  ) { }

  @UseGuards(AuthUserGuard)
  @UseGuards(AuthBankAccountGuard)
  @Get('')
  async query(@Query() filters: any, @BankAccount() bankAccount: BankAccountSession) {
    const { financialTransactions } = await this.financialTransactionQueryUseCase.perform({ ...filters, bankAccountId: bankAccount.id })

    return { financialTransactions }
  }

  @UseGuards(AuthUserGuard)
  @UseGuards(AuthBankAccountGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async create(@Body() body: any, @BankAccount() bankAccount: BankAccountSession) {
    await this.financialTransactionCreateUseCase.perform({ ...body, bankAccountId: bankAccount.id })

    return { message: 'Financial Transaction successfully created' }
  }
}