import { Module, Provider } from '@nestjs/common'
import { InfrastructureMailModule } from '@infrastructure/adapters/mail/mail.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { SendEmailNotificationCronTab } from '@application/jobs/cron-tabs/send-email-notification.cron-tab'

const providers: Provider[] = [
  SendEmailNotificationCronTab
]

@Module({
  imports: [
    InfrastructureMailModule,
    InfrastructureRepositoryModule,
  ],
  providers: [...providers],
  exports: [...providers]
})
export class CronTabModule { }