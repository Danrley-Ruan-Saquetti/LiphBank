import { Module } from '@nestjs/common'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { AuthSignInUseCase } from '@application/use-cases/auth/sign-in'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
  ],
  providers: [
    AuthSignInUseCase
  ],
  exports: [
    AuthSignInUseCase
  ]
})
export class AuthUseCaseModule { }