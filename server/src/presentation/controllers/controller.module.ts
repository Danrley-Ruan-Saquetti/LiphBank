import { Module } from '@nestjs/common'
import { UserController } from '@presentation/controllers/user.controller'
import { AuthController } from '@presentation/controllers/auth.controller'
import { PeopleController } from '@presentation/controllers/people.controller'
import { BankAccountController } from '@presentation/controllers/bank-account.controller'
import { FinancialTransactionController } from '@presentation/controllers/financial-transaction.controller'
import { UserUseCaseModule } from '@application/use-cases/user/use-case.module'
import { AuthUseCaseModule } from '@application/use-cases/auth/use-case.module'
import { PeopleUseCaseModule } from '@application/use-cases/people/use-case.module'
import { SharedUseCaseModule } from '@application/use-cases/shared/use-case.module'
import { BankAccountUseCaseModule } from '@application/use-cases/bank-account/use-case.module'
import { FinancialTransactionUseCaseModule } from '@application/use-cases/financial-transaction/use-case.module'

@Module({
  imports: [
    UserUseCaseModule,
    PeopleUseCaseModule,
    SharedUseCaseModule,
    AuthUseCaseModule,
    BankAccountUseCaseModule,
    FinancialTransactionUseCaseModule,
  ],
  controllers: [
    PeopleController,
    UserController,
    AuthController,
    BankAccountController,
    FinancialTransactionController
  ]
})
export class ControllerModule { }