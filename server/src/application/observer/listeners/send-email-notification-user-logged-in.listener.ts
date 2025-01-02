import { Injectable } from '@nestjs/common'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
import { User } from '@domain/entities/user.entity'
import { Templates } from '@domain/templates/templates'
import { TemplateGeneratorService } from '@domain/adapters/generator/template/template.service'
import { env } from '@shared/env'

@Injectable()
export class SendEmailNotificationUserLoggedInListener {

  constructor(
    private readonly emailNotificationCreateUseCase: EmailNotificationCreateUseCase,
    private readonly templateGenerator: TemplateGeneratorService,
  ) { }

  async perform(data: { user: User }) {
    const template = Templates.Templates['mail/user-logged-in']

    const mailContent = this.templateGenerator.generate(template)

    await this.emailNotificationCreateUseCase.perform({
      sender: env('APP_MAIL'),
      recipients: [data.user.login],
      subject: 'New login in your account',
      body: mailContent
    })
  }
}