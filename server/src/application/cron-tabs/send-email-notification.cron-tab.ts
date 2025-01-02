import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { CronTab } from '@application/cron-tabs/cron-tab'
import { MailService } from '@domain/adapters/mail/mail.service'
import { EmailNotification } from '@domain/entities/email-notification.entity'
import { NotificationSituation } from '@domain/entities/notification.entity'
import { EmailNotificationRepository } from '@domain/repositories/email-notification.repository'

@Injectable()
export class SendEmailNotificationCronTab extends CronTab {

  constructor(
    private readonly emailNotificationRepository: EmailNotificationRepository,
    private readonly mailService: MailService,
  ) {
    super()
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async sendEmailNotification() {
    const notificationInQueue = await this.getEmailNotificationsInQueue()

    for (let i = 0; i < notificationInQueue.length; i++) {
      try {
        const isSuccess = await this.sendEmail(notificationInQueue[i])

        await this.updateSituationNotification(isSuccess, notificationInQueue[i])
      } catch (error: any) {
        await this.erroLogService.save({
          type: 'JOB',
          origin: 'cron-tab.send-email-notification.send',
          message: error.message ?? 'Error',
          details: {
            ...error.details,
          }
        })
      }
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
    if (!isSuccess) emailNotification = await this.updateStateErrorSendNotification(emailNotification)
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