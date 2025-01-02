import { Module } from '@nestjs/common'
import { CronTabModule } from '@application/cron-tabs/cron-tab.module'
import { ListenerModule } from '@application/events/listeners/listener.module'
import { ConsumerModule } from '@application/jobs/consumer.module'

@Module({
  imports: [
    ListenerModule,
    ConsumerModule,
    CronTabModule,
  ]
})
export class ApplicationModule { }