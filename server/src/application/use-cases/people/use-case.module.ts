import { Module } from '@nestjs/common'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'

@Module({
  imports: [
    InfrastructureValidatorModule
  ],
  providers: [
    PeopleCreateUseCase
  ],
  exports: [
    PeopleCreateUseCase
  ]
})
export class PeopleUseCaseModule { }