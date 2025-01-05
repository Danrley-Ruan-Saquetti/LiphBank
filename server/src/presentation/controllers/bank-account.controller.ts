import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { User } from '@presentation/decorators/user.decorator'
import { UserSession } from '@presentation/types/user-session.type'
import { AuthUserGuard } from '@presentation/guards/auth-user.guard'
import { BankAccountQueryUseCase } from '@application/use-cases/bank-account/query.use-case'
import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'
import { SendEmailNotificationBankAccountCreatedListener } from '../../application/observer/listeners/send-email-notification-bank-account-created.listener'

@Controller('/bank-accounts')
export class BankAccountController {

  constructor(
    private readonly bankAccountCreateUseCase: BankAccountCreateUseCase,
    private readonly bankAccountQueryUseCase: BankAccountQueryUseCase,
    private readonly sendEmailNotificationBankAccountCreatedListener: SendEmailNotificationBankAccountCreatedListener,
  ) { }

  @UseGuards(AuthUserGuard)
  @Get('')
  async query(@Query() query: any, @User() user: UserSession) {
    const { bankAccounts } = await this.bankAccountQueryUseCase.perform({ ...query, peopleId: user.peopleId })

    return { bankAccounts }
  }

  @UseGuards(AuthUserGuard)
  @Post('/create')
  async create(@Body() body: any, @User() user: UserSession) {
    this.bankAccountCreateUseCase.observer.subscribe(
      'events.bank-account.created',
      async data => await this.sendEmailNotificationBankAccountCreatedListener.perform(data)
    )

    await this.bankAccountCreateUseCase.perform({ ...body, peopleId: user.peopleId })

    return { message: 'Bank Account successfully created' }
  }
}