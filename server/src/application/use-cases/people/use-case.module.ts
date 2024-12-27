import { Module } from '@nestjs/common'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

@Module({
  imports: [
    InfrastructureObserverModule,
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
  ],
  providers: [
    PeopleCreateUseCase
  ],
  exports: [
    PeopleCreateUseCase
  ]
})
export class PeopleUseCaseModule { }