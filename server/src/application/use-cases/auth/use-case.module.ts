import { Module } from '@nestjs/common'
import { InfrastructureJWTModule } from '@infrastructure/adapters/jwt/jwt.module'
import { InfrastructureHashModule } from '@infrastructure/adapters/crypto/crypto.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { AuthSignInUseCase } from '@application/use-cases/auth/sign-in.use-case'
import { AuthAuthorizationUseCase } from '@application/use-cases/auth/authorization.use-case'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureHashModule,
    InfrastructureJWTModule,
  ],
  providers: [
    AuthSignInUseCase,
    AuthAuthorizationUseCase,
  ],
  exports: [
    AuthSignInUseCase,
    AuthAuthorizationUseCase,
  ]
})
export class AuthUseCaseModule { }