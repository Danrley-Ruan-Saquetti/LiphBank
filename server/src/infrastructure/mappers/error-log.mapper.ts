import { ErrorLogModel } from '@infrastructure/models/error-log.model'
import { ErrorLog } from '@domain/entities/error-log.entity'

export class ErrorLogMapper {

  static multiEntityToDatabase(entities: ErrorLog[]) {
    return entities.map(entity => ErrorLogMapper.databaseToEntity(entity))
  }

  static multiDatabaseToEntity(databaseModels: ErrorLogModel[]) {
    return databaseModels.map(databaseModel => ErrorLogMapper.databaseToEntity(databaseModel))
  }

  static entityToDatabase(entity: ErrorLog) {
    const errorLogDatabase: ErrorLogModel = {
      id: entity.id,
      createdAt: entity.createdAt,
      details: entity.details,
      message: entity.message,
      origin: entity.origin,
    }

    return errorLogDatabase
  }

  static databaseToEntity(databaseModel: ErrorLogModel) {
    return ErrorLog.load({
      id: databaseModel.id,
      createdAt: databaseModel.createdAt,
      details: databaseModel.details,
      message: databaseModel.message,
      origin: databaseModel.origin,
    })
  }
}