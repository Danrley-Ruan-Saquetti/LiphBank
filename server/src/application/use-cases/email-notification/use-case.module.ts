import { Module, Provider } from '@nestjs/common'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

const providers: Provider[] = [
  EmailNotificationCreateUseCase
]

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureObserverModule,
  ],
  providers: [...providers],
  exports: [...providers]
})
export class EmailNotificationUseCaseModule { }