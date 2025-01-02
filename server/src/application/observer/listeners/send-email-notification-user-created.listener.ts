import { Injectable } from '@nestjs/common'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
import { User } from '@domain/entities/user.entity'
import { People } from '@domain/entities/people.entity'
import { Templates } from '@domain/templates/templates'
import { TemplateGeneratorService } from '@domain/adapters/generator/template/template.service'
import { env } from '@shared/env'

@Injectable()
export class SendEmailNotificationUserCreatedListener {

  constructor(
    private readonly emailNotificationCreateUseCase: EmailNotificationCreateUseCase,
    private readonly templateGenerator: TemplateGeneratorService,
  ) { }

  async perform(data: { user: User, people: People }) {
    const template = Templates.Templates['mail/user-created']
    const variablesTemplate: Templates.Variables['mail/user-created'] = {
      name: data.people.name,
      code: data.user.code,
    }

    const mailContent = this.templateGenerator.generate(template, variablesTemplate)

    await this.emailNotificationCreateUseCase.perform({
      sender: env('APP_MAIL'),
      recipients: [data.user.login],
      subject: 'Welcome to Liph Bank!',
      body: mailContent
    })
  }
}