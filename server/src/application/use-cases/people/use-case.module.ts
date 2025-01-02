import { Module, Provider } from '@nestjs/common'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

const providers: Provider[] = [
  PeopleCreateUseCase
]

@Module({
  imports: [
    InfrastructureObserverModule,
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
  ],
  providers: [...providers],
  exports: [...providers]
})
export class PeopleUseCaseModule { }