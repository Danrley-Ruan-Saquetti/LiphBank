import { Module } from '@nestjs/common'
import { UserUseCaseModule } from '@application/use-cases/user/use-case.module'
import { PeopleUseCaseModule } from '@application/use-cases/people/use-case.module'
import { CreatePeopleAndUserUseCase } from '@application/use-cases/shared/create-people-user.use-case'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'

@Module({
  imports: [
    PeopleUseCaseModule,
    UserUseCaseModule,
    InfrastructureValidatorModule,
  ],
  providers: [
    CreatePeopleAndUserUseCase,
  ],
  exports: [
    CreatePeopleAndUserUseCase,
  ]
})
export class SharedUseCaseModule { }