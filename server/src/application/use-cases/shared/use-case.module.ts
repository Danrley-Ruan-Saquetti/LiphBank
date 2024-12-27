import { Module } from '@nestjs/common'
import { UserUseCaseModule } from '@application/use-cases/user/use-case.module'
import { PeopleUseCaseModule } from '@application/use-cases/people/use-case.module'
import { CreatePeopleAndUserUseCase } from '@application/use-cases/shared/create-people-user.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureDatabaseModule } from '@infrastructure/adapters/database/database.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'

@Module({
  imports: [
    PeopleUseCaseModule,
    UserUseCaseModule,
    InfrastructureValidatorModule,
    InfrastructureDatabaseModule,
    InfrastructureObserverModule,
  ],
  providers: [
    CreatePeopleAndUserUseCase,
  ],
  exports: [
    CreatePeopleAndUserUseCase,
  ]
})
export class SharedUseCaseModule { }