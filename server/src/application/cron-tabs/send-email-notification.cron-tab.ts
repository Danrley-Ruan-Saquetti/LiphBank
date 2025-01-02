import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { MailService } from '@domain/adapters/mail/mail.service'
import { NotificationSituation } from '@domain/entities/notification.entity'
import { EmailNotificationRepository } from '@domain/repositories/email-notification.repository'

@Injectable()
export class SendEmailNotificationCronTab {

  constructor(
    private readonly emailNotificationRepository: EmailNotificationRepository,
    private readonly mailService: MailService,
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async sendEmailNotification() {
    const notificationInQueue = await this.emailNotificationRepository.findMany({
      where: {
        situation: NotificationSituation.IN_QUEUE
      },
      orderBy: { id: 'asc' },
      take: 100
    })

    for (let i = 0; i < notificationInQueue.length; i++) {
      const { sender, recipient, body, subject } = notificationInQueue[i]

      this.mailService.send({ from: sender, to: recipient.split(','), subject, body })
    }
  }
}