import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { MailService } from '@domain/adapters/mail/mail.service'
import { NotificationSituation } from '@domain/entities/notification.entity'
import { EmailNotificationRepository } from '@domain/repositories/email-notification.repository'
import { EmailNotification } from '@domain/entities/email-notification.entity'

@Injectable()
export class SendEmailNotificationCronTab {

  constructor(
    private readonly emailNotificationRepository: EmailNotificationRepository,
    private readonly mailService: MailService,
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async sendEmailNotification() {
    const notificationInQueue = await this.getEmailNotificationsInQueue()

    for (let i = 0; i < notificationInQueue.length; i++) {
      const isSuccess = await this.sendEmail(notificationInQueue[i])

      await this.updateSituationNotification(isSuccess, notificationInQueue[i])
    }
  }

  private async getEmailNotificationsInQueue() {
    return await this.emailNotificationRepository.findMany({
      where: { notification: { situation: NotificationSituation.IN_QUEUE } },
      orderBy: { id: 'asc' },
      take: 100
    })
  }

  private async sendEmail({ sender, recipient, body, subject }: EmailNotification) {
    try {
      await this.mailService.send({ from: sender, to: recipient, subject, body })

      return true
    } catch (error: any) {
      return false
    }
  }

  private async updateSituationNotification(isSuccess: boolean, emailNotification: EmailNotification) {
    if (isSuccess) emailNotification = await this.updateStateErrorSendNotification(emailNotification)
    else emailNotification = await this.updateStateSuccessSendNotification(emailNotification)

    await this.emailNotificationRepository.update(emailNotification.id, emailNotification)
  }

  private async updateStateErrorSendNotification(emailNotification: EmailNotification) {
    emailNotification.situation = NotificationSituation.ERROR

    return emailNotification
  }

  private async updateStateSuccessSendNotification(emailNotification: EmailNotification) {
    emailNotification.situation = NotificationSituation.SENT
    emailNotification.sendAt = new Date(Date.now())

    return emailNotification
  }
}