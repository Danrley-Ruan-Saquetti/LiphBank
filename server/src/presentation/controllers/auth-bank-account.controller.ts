import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthBankAccountSignInUseCase } from '@application/use-cases/auth/bank-account/sign-in.use-case'
import { User } from '@presentation/decorators/user.decorator'
import { UserSession } from '@presentation/types/user-session.type'
import { AuthUserGuard } from '@presentation/guards/auth-user.guard'

@Controller('/auth/bank-account')
export class AuthBankAccountController {

  constructor(
    private readonly authBankAccountSignInUseCase: AuthBankAccountSignInUseCase,
  ) { }

  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() body: any, @User() user: UserSession) {
    const response = await this.authBankAccountSignInUseCase.perform({ ...body, peopleId: user.peopleId })

    return { token: response.token }
  }
}