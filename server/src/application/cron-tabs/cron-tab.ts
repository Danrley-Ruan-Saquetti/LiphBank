import { Inject } from '@nestjs/common'
import { ErrorLogService } from '@domain/adapters/error-log/error-log.service'

export class CronTab {

  @Inject(ErrorLogService)
  protected erroLogService: ErrorLogService
}