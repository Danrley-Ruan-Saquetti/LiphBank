import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@presentation/guards/auth.guard'
import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'

@Controller('/bank-accounts')
export class BankAccountController {

  constructor(
    private readonly bankAccountCreateUseCase: BankAccountCreateUseCase
  ) { }

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Body() body: any) {
    await this.bankAccountCreateUseCase.perform({ ...body })

    return { message: 'Bank Account successfully created' }
  }
}