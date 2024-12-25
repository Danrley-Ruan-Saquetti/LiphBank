import { Module } from '@nestjs/common'
import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
  ],
  providers: [
    BankAccountCreateUseCase
  ],
  exports: [
    BankAccountCreateUseCase
  ]
})
export class BankAccountUseCaseModule { }