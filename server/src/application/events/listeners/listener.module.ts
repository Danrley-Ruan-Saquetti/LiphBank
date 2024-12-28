import { Module } from '@nestjs/common'
import { UserListener } from '@application/events/listeners/user.listener'
import { NotificationUseCaseModule } from '@application/use-cases/notification/use-case.module'

@Module({
  imports: [
    NotificationUseCaseModule
  ],
  providers: [UserListener]
})
export class ListenerModule { }