import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { ErrorLogCreateDTO, errorLogCreateSchema } from '@application/dto/error-log/create.dto'
import { ErrorLog } from '@domain/entities/error-log.entity'
import { ErrorLogRepository } from '@domain/repositories/error-log.repository'

@Injectable()
export class ErrorLogCreateUseCase extends UseCase {

  constructor(
    private readonly errorLogRepository: ErrorLogRepository
  ) {
    super()
  }

  async perform(args: ErrorLogCreateDTO) {
    const { details, message, origin } = this.validator.validate(errorLogCreateSchema, args)

    const errorLog = new ErrorLog({
      details,
      message,
      origin,
    })

    const errorLogCreated = await this.errorLogRepository.create(errorLog)

    return { errorLog: errorLogCreated }
  }
}