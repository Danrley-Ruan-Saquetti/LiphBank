import { Module } from '@nestjs/common'
import { FinancialTransactionQueryUseCase } from '@application/use-cases/financial-transaction/query.use-case'
import { FinancialTransactionCreateUseCase } from '@application/use-cases/financial-transaction/create.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureObserverModule,
  ],
  providers: [
    FinancialTransactionCreateUseCase,
    FinancialTransactionQueryUseCase,
  ],
  exports: [
    FinancialTransactionCreateUseCase,
    FinancialTransactionQueryUseCase,
  ]
})
export class FinancialTransactionUseCaseModule { }