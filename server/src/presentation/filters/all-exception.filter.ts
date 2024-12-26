import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Result } from '@presentation/util/result'
import { env } from '@shared/env'
import { CriticalException, RuntimeException } from '@shared/exceptions'

@Catch()
export class CatchAllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()

    const httpStatus = CatchAllExceptionFilter.getStatusCode(exception)
    const responseBody = CatchAllExceptionFilter.getResponseException(exception).toJSON()

    this.httpAdapterHost.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }

  private static getResponseException(exception: any) {
    const responseBody = {
      message: exception?.message || 'Error',
      details: exception?.details || {}
    }

    if (env('ENVIRONMENT') == 'PRODUCTION') {
      if (exception instanceof CriticalException || (exception instanceof HttpException && exception.getStatus() >= 500)) {
        responseBody.message = 'Internal Server Error. Try again later'
        responseBody.details = {}
      }
    }

    return Result.failure(responseBody, CatchAllExceptionFilter.getStatusCode(exception))
  }

  private static getStatusCode(exception: unknown) {
    if (exception instanceof RuntimeException) return HttpStatus.BAD_REQUEST
    if (exception instanceof CriticalException) return HttpStatus.INTERNAL_SERVER_ERROR
    if (exception instanceof HttpException) return exception.getStatus()

    return HttpStatus.INTERNAL_SERVER_ERROR
  }
}