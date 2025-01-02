import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'
import { QueueConsumer } from '@application/jobs/consumers/consumer'
import { SendEmailNotificationJobData } from '@application/jobs/email-notification/send-email-notification.job'
import { Templates } from '@domain/templates/templates'
import { MailService } from '@domain/adapters/mail/mail.service'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { TemplateGeneratorService } from '@domain/adapters/generator/template/template.service'
import { env } from '@shared/env'

@Processor('queue.email-notification')
export class EmailNotificationConsumer extends QueueConsumer {

  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly templateGenerator: TemplateGeneratorService,
    private readonly mailService: MailService,
  ) {
    super()
  }

  @Process('job.send-email-notification')
  async sendEmailNotification({ data }: Job<SendEmailNotificationJobData>) {
    const people = await this.peopleRepository.findById(data.peopleId)

    const template = Templates.Templates['mail/user-sign-in']
    const variables: Templates.Variables['mail/user-sign-in'] = {
      code: data.code,
      name: people?.name ?? '(empty)',
    }

    const body = this.templateGenerator.generate(template, variables)

    await this.mailService.send({
      from: env('MAIL_USER'),
      to: [data.code],
      subject: 'Hello World',
      body: body,
    })
  }
}