import { Module } from '@nestjs/common'
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
  ],
  exports: [
    FinancialTransactionCreateUseCase,
  ]
})
export class FinancialTransactionUseCaseModule { }