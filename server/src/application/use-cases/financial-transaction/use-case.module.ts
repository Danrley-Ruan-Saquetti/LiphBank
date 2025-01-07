import { Module, Provider } from '@nestjs/common'
import { FinancialTransactionQueryUseCase } from '@application/use-cases/financial-transaction/query.use-case'
import { FinancialTransactionCancelUseCase } from '@application/use-cases/financial-transaction/cancel.use-case'
import { FinancialTransactionCreateUseCase } from '@application/use-cases/financial-transaction/create.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

const providers: Provider[] = [
  FinancialTransactionCreateUseCase,
  FinancialTransactionQueryUseCase,
  FinancialTransactionCancelUseCase,
]

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureObserverModule,
  ],
  providers: [...providers],
  exports: [...providers]
})
export class FinancialTransactionUseCaseModule { }