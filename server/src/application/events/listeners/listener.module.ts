import { Module } from '@nestjs/common'
import { UserListener } from '@application/events/listeners/user.listener'
import { EmailNotificationUseCaseModule } from '@application/use-cases/email-notification/use-case.module'

@Module({
  imports: [
    EmailNotificationUseCaseModule
  ],
  providers: [UserListener]
})
export class ListenerModule { }