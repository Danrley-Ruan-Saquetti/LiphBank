import { Module, Provider } from '@nestjs/common'
import { ConcurrencyServiceImplemntation } from '@infrastructure/adapters/concurrency/concurrency.service'
import { ConcurrencyService } from '@domain/adapters/concurrency/concurrency.serivce'

const providers: Provider[] = [
  {
    provide: ConcurrencyService,
    useClass: ConcurrencyServiceImplemntation
  }
]

@Module({
  providers: [...providers],
  exports: [...providers]
})
export class InfrastructureConcurrencyModule { }