import { Module, Provider } from '@nestjs/common'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'
import { InfrastructureDatabaseModule } from '@infrastructure/adapters/database/database.module'
import { UserRepositoryImplementation } from '@infrastructure/repositories/user.repository'
import { PeopleRepositoryImplementation } from '@infrastructure/repositories/people.repository'
import { BankAccountRepositoryImplementation } from '@infrastructure/repositories/bank-account.repository'
import { FinancialTransactionRepositoryImplementation } from '@infrastructure/repositories/financial-transaction.repository'

const providers: Provider[] = [
  {
    provide: PeopleRepository,
    useClass: PeopleRepositoryImplementation
  },
  {
    provide: UserRepository,
    useClass: UserRepositoryImplementation
  },
  {
    provide: BankAccountRepository,
    useClass: BankAccountRepositoryImplementation
  },
  {
    provide: FinancialTransactionRepository,
    useClass: FinancialTransactionRepositoryImplementation
  },
] as const

@Module({
  imports: [
    InfrastructureDatabaseModule,
  ],
  providers: [...providers],
  exports: [...providers]
})
export class InfrastructureRepositoryModule {

}