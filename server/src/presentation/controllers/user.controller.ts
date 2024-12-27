import { Body, Controller, Post } from '@nestjs/common'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { UserType } from '@domain/entities/user.entity'

@Controller('/users')
export class UserController {

  constructor(
    private readonly userCreateUseCase: UserCreateUseCase
  ) { }

  @Post('/create')
  async create(@Body() body: any) {
    await this.userCreateUseCase.perform({ ...body, type: UserType.CLIENT })

    return { message: 'User successfully created' }
  }
}