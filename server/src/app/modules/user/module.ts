import { Module } from '@nestjs/common'
import { UserCreateUseCase } from './use-cases/create'
import { UserGenerateCodeUseCase } from './use-cases/generate-code'
import { UserRepository } from './repository'
import { UserPrismaRepository } from './infra/repository'
import { PeopleModule } from '../people/module'

@Module({
  imports: [
    PeopleModule
  ],
  providers: [
    UserCreateUseCase,
    UserGenerateCodeUseCase,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    }
  ],
  exports: [
    UserCreateUseCase
  ]
})
export class UserModule { }