import { Module } from '@nestjs/common'
import { CronTabModule } from '@application/jobs/cron-tabs/cron-tab.module'
import { ConsumerModule } from '@application/jobs/queues/consumer.module'

@Module({
  imports: [
    ConsumerModule,
    CronTabModule,
  ]
})
export class ApplicationModule { }