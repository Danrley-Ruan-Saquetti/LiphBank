import { Module } from '@nestjs/common'
import { InfrastructureJWTModule } from '@infrastructure/adapters/jwt/jwt.module'
import { InfrastructureHashModule } from '@infrastructure/adapters/crypto/crypto.module'
import { InfrastructureObserverModule } from '@infrastructure/adapters/observer/observer.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { ConsumerModule } from '@application/jobs/consumer.module'
import { AuthSignInUseCase } from '@application/use-cases/auth/user/sign-in.use-case'
import { AuthUserAuthorizationUseCase } from '@application/use-cases/auth/user/authorization.use-case'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureRepositoryModule,
    InfrastructureHashModule,
    InfrastructureJWTModule,
    InfrastructureObserverModule,
    ConsumerModule,
  ],
  providers: [
    AuthSignInUseCase,
    AuthUserAuthorizationUseCase,
  ],
  exports: [
    AuthSignInUseCase,
    AuthUserAuthorizationUseCase,
  ]
})
export class AuthUseCaseModule { }