import { NotificationMapper } from '@infrastructure/mappers/notification.mapper'
import { Notification } from '@domain/entities/notification.entity'
import { Database } from '@domain/database'
import { NotificationQueryArgs, NotificationRepository } from '@domain/repositories/notification.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NotificationRepositoryImplementation extends NotificationRepository {

  constructor(
    private readonly database: Database
  ) {
    super()
  }

  async create(notification: Notification) {
    try {
      const notificationModel = NotificationMapper.entityToDatabase(notification)

      const notificationDatabase = await this.database.notification.create({
        data: {
          body: notificationModel.body,
          subject: notificationModel.subject,
          type: notificationModel.type,
          sendAt: notificationModel.sendAt,
          situation: notificationModel.situation,
        }
      })

      return NotificationMapper.databaseToEntity(notificationDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async update(id: number, notification: Notification) {
    try {
      const notificationModel = NotificationMapper.entityToDatabase(notification)

      const notificationDatabase = await this.database.notification.update({
        where: { id },
        data: {
          body: notificationModel.body,
          subject: notificationModel.subject,
          type: notificationModel.type,
          sendAt: notificationModel.sendAt,
          situation: notificationModel.situation,
        }
      })

      return NotificationMapper.databaseToEntity(notificationDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async delete(id: number) {
    try {
      await this.database.notification.delete({ where: { id } })
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findMany(args: NotificationQueryArgs = {}) {
    try {
      const notificationsDatabase = await this.database.notification.findMany({ ...args } as any)

      return NotificationMapper.multiDatabaseToEntity(notificationsDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findById(id: number) {
    try {
      const notificationDatabase = await this.database.notification.findUnique({ where: { id } })

      return notificationDatabase ? NotificationMapper.databaseToEntity(notificationDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }
}