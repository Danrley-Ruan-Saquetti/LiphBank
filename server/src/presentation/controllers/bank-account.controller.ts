import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { User } from '@presentation/decorators/user.decorator'
import { AuthGuard } from '@presentation/guards/auth.guard'
import { BankAccountQueryUseCase } from '@application/use-cases/bank-account/query.use-case'
import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'

@Controller('/bank-accounts')
export class BankAccountController {

  constructor(
    private readonly bankAccountCreateUseCase: BankAccountCreateUseCase,
    private readonly bankAccountQueryUseCase: BankAccountQueryUseCase
  ) { }

  @UseGuards(AuthGuard)
  @Get('')
  async query(@User() user: any) {
    const { bankAccounts } = await this.bankAccountQueryUseCase.perform({ peopleId: user.peopleId })

    return { bankAccounts }
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Body() body: any, @User() user: any) {
    await this.bankAccountCreateUseCase.perform({ ...body, peopleId: user.peopleId })

    return { message: 'Bank Account successfully created' }
  }
}