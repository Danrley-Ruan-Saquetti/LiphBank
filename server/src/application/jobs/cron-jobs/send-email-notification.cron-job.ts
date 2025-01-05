import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { CronJob } from '@application/jobs/cron-jobs/cron-job'
import { MailService } from '@domain/adapters/mail/mail.service'
import { EmailNotification } from '@domain/entities/email-notification.entity'
import { NotificationSituation } from '@domain/entities/notification.entity'
import { EmailNotificationRepository } from '@domain/repositories/email-notification.repository'

@Injectable()
export class SendEmailNotificationCronJob extends CronJob {

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
      const { sender, recipient, body, subject } = notificationInQueue[i]

      try {
        await this.mailService.send({ from: sender, to: recipient, subject, body })

        await this.updateSituationNotification(true, notificationInQueue[i])
      } catch (error: any) {
        await this.erroLogService.save({
          type: 'JOB',
          origin: 'cron-job.send-email-notification.send',
          message: error.message ?? 'Error',
          details: {
            ...error.details,
          }
        })

        await this.updateSituationNotification(false, notificationInQueue[i])
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
    await this.mailService.send({ from: sender, to: recipient, subject, body })
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