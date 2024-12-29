import { Module } from '@nestjs/common'
import { ListenerModule } from '@application/events/listeners/listener.module'
import { ConsumerModule } from '@application/jobs/consumer.module'

@Module({
  imports: [
    ListenerModule,
    ConsumerModule,
  ]
})
export class ApplicationModule { }