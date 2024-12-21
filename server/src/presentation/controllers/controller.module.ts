import { Module } from '@nestjs/common'
import { UserController } from '@presentation/controllers/user.controller'
import { PeopleController } from '@presentation/controllers/people.controller'
import { UserUseCaseModule } from '@application/use-cases/user/use-case.module'
import { PeopleUseCaseModule } from '@application/use-cases/people/use-case.module'

@Module({
  imports: [
    UserUseCaseModule,
    PeopleUseCaseModule,
  ],
  controllers: [
    PeopleController,
    UserController,
  ]
})
export class ControllerModule { }