import { Module } from '@nestjs/common'
import { UserListener } from '@application/events/listeners/user.listener'

@Module({
  providers: [UserListener]
})
export class ListenerModule { }