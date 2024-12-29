import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'
import { SendEmailNotificationJob } from '@application/jobs/email-notification/send-email-notification.job'

@Processor('queue.email-notification')
export class EmailNotificationConsumer {

  @Process('job.send-email-notification')
  async sendEmailNotification({ data }: Job<SendEmailNotificationJob>) {
    console.log(data)
  }
}