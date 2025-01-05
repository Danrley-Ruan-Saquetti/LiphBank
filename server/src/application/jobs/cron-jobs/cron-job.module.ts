import { Module, Provider } from '@nestjs/common'
import { InfrastructureMailModule } from '@infrastructure/adapters/mail/mail.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { SendEmailNotificationCronJob } from '@application/jobs/cron-jobs/send-email-notification.cron-job'
import { InfrastructureErrorLogModule } from '@infrastructure/adapters/error-log/error-log.module'

const providers: Provider[] = [
  SendEmailNotificationCronJob
]

@Module({
  imports: [
    InfrastructureMailModule,
    InfrastructureRepositoryModule,
    InfrastructureErrorLogModule,
  ],
  providers: [...providers],
  exports: [...providers]
})
export class CronJobModule { }