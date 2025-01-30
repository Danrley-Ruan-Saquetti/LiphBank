import { Module, Provider } from '@nestjs/common'
import { ConcurrencyServiceImplementation } from '@infrastructure/adapters/concurrency/concurrency.service'
import { ConcurrencyService } from '@domain/adapters/concurrency/concurrency.service'

const providers: Provider[] = [
  {
    provide: ConcurrencyService,
    useClass: ConcurrencyServiceImplementation
  }
]

@Module({
  providers: [...providers],
  exports: [...providers]
})
export class InfrastructureConcurrencyModule { }