import { Global, Module, Provider } from '@nestjs/common'
import { ErrorLogServiceImplementation } from '@infrastructure/adapters/error-log/error-log.service'
import { ErrorLogService } from '@domain/adapters/error-log/error-log.service'

const providers: Provider[] = [
  {
    provide: ErrorLogService,
    useClass: ErrorLogServiceImplementation
  },
]

@Global()
@Module({
  providers: [...providers],
  exports: [...providers]
})
export class InfrastructureErrorLogModule { }