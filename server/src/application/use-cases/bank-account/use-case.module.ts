import { Module } from '@nestjs/common'
import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'
import { BankAccountGenerateCodeUseCase } from '@application/use-cases/bank-account/generate-code.use-case'
import { BankAccountQueryUseCase } from '@application/use-cases/bank-account/query.use-case'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { InfrastructureGeneratorCodeModule } from '@infrastructure/adapters/generator/code/code.module'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureGeneratorCodeModule,
    InfrastructureObserverModule,
  ],
  providers: [
    BankAccountCreateUseCase,
    BankAccountGenerateCodeUseCase,
    BankAccountQueryUseCase,
  ],
  exports: [
    BankAccountCreateUseCase,
    BankAccountGenerateCodeUseCase,
    BankAccountQueryUseCase,
  ]
})
export class BankAccountUseCaseModule { }