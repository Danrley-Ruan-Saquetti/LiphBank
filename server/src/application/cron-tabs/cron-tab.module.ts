import { Module } from '@nestjs/common'
import { InfrastructureMailModule } from '@infrastructure/adapters/mail/mail.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { SendEmailNotificationCronTab } from '@application/cron-tabs/send-email-notification.cron-tab'

@Module({
  imports: [
    InfrastructureMailModule,
    InfrastructureRepositoryModule,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class CronTabModule { }