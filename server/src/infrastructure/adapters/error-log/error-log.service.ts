import { ErrorLog } from '@domain/entities/error-log.entity'
import { ErrorLogRepository } from '@domain/repositories/error-log.repository'
import { ErrorLogSaveProps, ErrorLogService } from '@domain/adapters/error-log/error-log.service'

export class ErrorLogServiceImplementation extends ErrorLogService {

  constructor(
    private readonly errorLogRepository: ErrorLogRepository
  ) {
    super()
  }

  async save({ message, origin, details }: ErrorLogSaveProps) {
    return await this.errorLogRepository.create(new ErrorLog({
      details,
      message,
      origin,
    }))
  }
}