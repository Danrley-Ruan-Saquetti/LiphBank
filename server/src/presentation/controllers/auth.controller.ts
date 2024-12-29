import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { UserType } from '@domain/entities/user.entity'
import { AuthUserSignInUseCase } from '@application/use-cases/auth/user/sign-in.use-case'
import { CreatePeopleAndUserUseCase } from '@application/use-cases/shared/create-people-user.use-case'

@Controller('/auth')
export class AuthController {

  constructor(
    private readonly createPeopleAndUserUseCase: CreatePeopleAndUserUseCase,
    private readonly authUserSignInUseCase: AuthUserSignInUseCase,
  ) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async signUp(@Body() body: any) {
    await this.createPeopleAndUserUseCase.perform({
      people: {
        ...body,
      },
      user: {
        ...body,
        type: UserType.CLIENT
      }
    })

    return { message: 'User successfully created' }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() body: any) {
    const response = await this.authUserSignInUseCase.perform({ ...body, type: UserType.CLIENT })

    return { token: response.token }
  }
}