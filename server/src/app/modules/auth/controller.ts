import { Body, Controller, Post } from '@nestjs/common'
import { UserType } from '@app/modules/user/model'
import { AuthSignInUseCaseArgs, AuthSignInUseCase } from '@app/modules/auth/use-cases/sign-in'

@Controller('/auth')
export class AuthController {

  constructor(
    private readonly singInUseCase: AuthSignInUseCase
  ) { }

  @Post('/sign-in')
  async signIn(@Body() body: Omit<AuthSignInUseCaseArgs, 'type'>) {
    const response = await this.singInUseCase.perform({
      ...body,
      type: UserType.CUSTOMER
    })

    return response
  }
}