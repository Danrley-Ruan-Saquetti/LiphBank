import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { MailModule } from '@infrastructure/adapters/mail/mail.module'
import { InfrastructureGeneratorTemplateModule } from '@infrastructure/adapters/generator/template/template.module'
import { EmailNotificationConsumer } from '@application/jobs/consumers/email.notification.consumer'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue.email-notification',
    }),
    MailModule,
    InfrastructureGeneratorTemplateModule,
    InfrastructureRepositoryModule,
  ],
  providers: [
    EmailNotificationConsumer
  ],
  exports: [
    BullModule,
    EmailNotificationConsumer
  ],
})
export class ConsumerModule { }