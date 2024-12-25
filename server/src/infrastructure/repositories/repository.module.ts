import { Module } from '@nestjs/common'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'
import { InfrastructureDatabaseModule } from '@infrastructure/adapters/database/database.module'
import { UserRepositoryImplementation } from '@infrastructure/repositories/user.repository'
import { PeopleRepositoryImplementation } from '@infrastructure/repositories/people.repository'
import { BankAccountRepositoryImplementation } from '@infrastructure/repositories/bank-account.repository'

@Module({
  imports: [
    InfrastructureDatabaseModule,
  ],
  providers: [
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
  ],
  exports: [
    {
      provide: PeopleRepository,
      useClass: PeopleRepositoryImplementation
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImplementation
    },
  ]
})
export class InfrastructureRepositoryModule {

}