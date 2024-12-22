import { Module } from '@nestjs/common'
import { UserController } from '@presentation/controllers/user.controller'
import { AuthController } from '@presentation/controllers/auth.controller'
import { PeopleController } from '@presentation/controllers/people.controller'
import { UserUseCaseModule } from '@application/use-cases/user/use-case.module'
import { PeopleUseCaseModule } from '@application/use-cases/people/use-case.module'
import { SharedUseCaseModule } from '@application/use-cases/shared/use-case.module'

@Module({
  imports: [
    UserUseCaseModule,
    PeopleUseCaseModule,
    SharedUseCaseModule,
  ],
  controllers: [
    PeopleController,
    UserController,
    AuthController,
  ]
})
export class ControllerModule { }