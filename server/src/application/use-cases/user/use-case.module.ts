import { Module } from '@nestjs/common'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { InfrastructureGeneratorCodeModule } from '@infrastructure/adapters/generator/code/code.module'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { UserGenerateCodeUseCase } from '@application/use-cases/user/generate-code.use-case'
import { InfrastructureHashModule } from '@infrastructure/adapters/crypto/crypto.module'

@Module({
  imports: [
    InfrastructureValidatorModule,
    InfrastructureGeneratorCodeModule,
    InfrastructureRepositoryModule,
    InfrastructureHashModule,
  ],
  providers: [
    UserCreateUseCase,
    UserGenerateCodeUseCase,
  ],
  exports: [
    UserCreateUseCase,
    UserGenerateCodeUseCase,
  ]
})
export class UserUseCaseModule { }