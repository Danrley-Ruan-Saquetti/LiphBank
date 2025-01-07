import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { CronJob } from '@application/jobs/cron-jobs/cron-job'

@Injectable()
export class UpdateSituationFinancialTransactionCronJob extends CronJob {

  constructor(
  ) {
    super()
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async foo() {

  }
}