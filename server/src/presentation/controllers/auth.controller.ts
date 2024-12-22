import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { UserType } from '@domain/entities/user.entity'
import { CreatePeopleAndUserDTO } from '@application/dto/shared/create-people-user.dto'
import { CreatePeopleAndUserUseCase } from '@application/use-cases/shared/create-people-user.use-case'

@Controller('/auth')
export class AuthController {

  constructor(
    private readonly createPeopleAndUserUseCase: CreatePeopleAndUserUseCase
  ) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async signUp(@Body() body: CreatePeopleAndUserDTO) {
    await this.createPeopleAndUserUseCase.perform({
      people: {
        ...body?.people,
      },
      user: {
        ...body?.user,
        type: UserType.CLIENT
      }
    })

    return { message: 'User successfully created' }
  }
}