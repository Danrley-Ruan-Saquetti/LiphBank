import { Injectable } from '@nestjs/common'
import { EmailNotificationCreateUseCase } from '@application/use-cases/email-notification/create.use-case'
import { Templates } from '@domain/templates/templates'
import { BankAccount } from '@domain/entities/bank-account.entity'
import { UserRepository } from '@domain/repositories/user.repository';
import { TemplateGeneratorService } from '@domain/adapters/generator/template/template.service'
import { env } from '@shared/env'

@Injectable()
export class SendEmailNotificationBankAccountLoggedInListener {

  constructor(
    private readonly emailNotificationCreateUseCase: EmailNotificationCreateUseCase,
    private readonly templateGenerator: TemplateGeneratorService,
    private readonly userRepository: UserRepository
  ) { }

  async perform(data: { bankAccount: BankAccount }) {
    const [user] = await this.userRepository.findMany({
      where: { peopleId: data.bankAccount.peopleId },
      take: 1,
    })

    if (!user) {
      return
    }

    const template = Templates.Templates['mail/bank-account-logged-in']
    const templateVariables: Templates.Variables['mail/bank-account-logged-in'] = {
      bankAccountName: data.bankAccount.name
    }

    const mailContent = this.templateGenerator.generate(template, templateVariables)

    await this.emailNotificationCreateUseCase.perform({
      sender: env('APP_MAIL'),
      recipients: [user.login],
      subject: 'New login in your bank account',
      body: mailContent
    })
  }
}