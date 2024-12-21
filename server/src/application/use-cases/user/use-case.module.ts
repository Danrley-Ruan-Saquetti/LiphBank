import { Module } from '@nestjs/common'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'

@Module({
  imports: [
    InfrastructureValidatorModule
  ],
  providers: [
    UserCreateUseCase
  ],
  exports: [
    UserCreateUseCase
  ]
})
export class UserUseCaseModule { }