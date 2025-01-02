import { Module } from '@nestjs/common'
import { CronTabModule } from '@application/cron-tabs/cron-tab.module'
import { ConsumerModule } from '@application/jobs/consumer.module'

@Module({
  imports: [
    ConsumerModule,
    CronTabModule,
  ]
})
export class ApplicationModule { }