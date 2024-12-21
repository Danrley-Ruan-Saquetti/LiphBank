import { Module } from '@nestjs/common'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureGeneratorCodeModule } from '@infrastructure/adapters/generator/code/code.module'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureGeneratorCodeModule,
  ],
  providers: [
    UserCreateUseCase
  ],
  exports: [
    UserCreateUseCase
  ]
})
export class UserUseCaseModule { }