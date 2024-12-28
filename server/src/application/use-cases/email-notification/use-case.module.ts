import { Module } from '@nestjs/common'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
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
    EmailNotificationCreateUseCase,
  ],
  exports: [
    EmailNotificationCreateUseCase,
  ]
})
export class EmailNotificationUseCaseModule { }