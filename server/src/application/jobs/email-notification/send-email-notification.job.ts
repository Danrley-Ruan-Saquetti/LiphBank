import { DataJob } from '@application/jobs/job-data'
import { User } from '@domain/entities/user.entity'

export type SendEmailNotificationJobData = User

export class SendEmailNotificationJob extends DataJob<SendEmailNotificationJobData> {

  static KEY_JOB = 'job.send-email-notification'

}