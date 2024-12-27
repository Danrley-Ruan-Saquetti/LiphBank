import { Module } from '@nestjs/common'
import { ListenerModule } from '@application/events/listeners/listener.module'

@Module({
  imports: [
    ListenerModule
  ]
})
export class ApplicationModule { }