import { Injectable } from '@nestjs/common'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
import { User } from '@domain/entities/user.entity'
import { Templates } from '@domain/templates/templates'
import { BankAccount } from '@domain/entities/bank-account.entity'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { TemplateGeneratorService } from '@domain/adapters/generator/template/template.service'
import { env } from '@shared/env'

@Injectable()
export class SendEmailNotificationBankAccountCreatedListener {

  constructor(
    private readonly emailNotificationCreateUseCase: EmailNotificationCreateUseCase,
    private readonly templateGenerator: TemplateGeneratorService,
    private readonly peopleRepository: PeopleRepository,
  ) { }

  async perform(data: { bankAccount: BankAccount, user: User }) {
    const people = await this.peopleRepository.findById(data.user.peopleId)

    const template = Templates.Templates['mail/bank-account-created']
    const variablesTemplate: Templates.Variables['mail/bank-account-created'] = {
      name: people?.name || '(empty)',
      code: data.user.code,
    }

    const mailContent = this.templateGenerator.generate(template, variablesTemplate)

    await this.emailNotificationCreateUseCase.perform({
      sender: env('APP_MAIL'),
      recipients: [data.user.login],
      subject: 'New Bank Account registered!',
      body: mailContent
    })
  }
}