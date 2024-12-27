import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@presentation/guards/auth.guard'
import { FinancialTransactionCreateUseCase } from '@application/use-cases/financial-transaction/create.use-case'

@Controller('/bank-accounts/:id/financial-transactions')
export class FinancialTransactionController {

  constructor(
    private readonly financialTransactionCreateUseCase: FinancialTransactionCreateUseCase
  ) { }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async create(@Body() body: any, @Param('id') bankAccountId: string) {
    await this.financialTransactionCreateUseCase.perform({ ...body, bankAccountId: +bankAccountId })

    return { message: 'Financial Transaction successfully created' }
  }
}