import { Inject } from '@nestjs/common'
import { OnQueueFailed } from '@nestjs/bull'
import { Job } from 'bull'
import { ErrorLogService } from '@domain/adapters/error-log/error-log.service'

export class QueueConsumer {

  @Inject(ErrorLogService)
  private errorLogService: ErrorLogService

  @OnQueueFailed()
  async handler(job: Job, error: any) {
    await this.errorLogService.save({
      origin: 'JOB',
      message: error.message,
      details: {
        ...error.details,
        JOB: {
          name: job.name,
        }
      }
    })
  }
}