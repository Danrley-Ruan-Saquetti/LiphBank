import { Module, Provider } from '@nestjs/common'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
import { EmailNotificationSendEmailInQueue } from '@application/use-cases/email-notification/send-email-in-queue.use-case'
import { InfrastructureMailModule } from '@infrastructure/adapters/mail/mail.module'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

const providers: Provider[] = [
  EmailNotificationCreateUseCase,
  EmailNotificationSendEmailInQueue,
]

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureObserverModule,
    InfrastructureMailModule
  ],
  providers: [...providers],
  exports: [...providers]
})
export class EmailNotificationUseCaseModule { }