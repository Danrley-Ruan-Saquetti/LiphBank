import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { EmailNotificationConsumer } from '@application/jobs/email.notification.consumer'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue.email-notification',
    })
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