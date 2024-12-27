import { Module } from '@nestjs/common'
import { NotificationCreateUseCase } from '@application/use-cases/notification/create.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureObserverModule,
  ],
  providers: [
    NotificationCreateUseCase,
  ],
  exports: [
    NotificationCreateUseCase,
  ]
})
export class NotificationUseCaseModule { }