import { OnQueueFailed } from '@nestjs/bull'
import { Job } from 'bull'

export class QueueConsumer {

  @OnQueueFailed()
  handler(job: Job, error: Error) {
    console.log(`Job name: "${job.name}"`, error)
  }
}