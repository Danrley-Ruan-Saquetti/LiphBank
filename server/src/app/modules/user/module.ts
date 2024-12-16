import { Module } from '@nestjs/common'
import { AppPeopleModule } from '@app/modules/people/module'
import { UserRepository } from '@app/modules/user/repository'
import { UserCreateUseCase } from '@app/modules/user/use-cases/create'
import { UserPrismaRepository } from '@app/modules/user/infra/repository'
import { UserGenerateCodeUseCase } from '@app/modules/user/use-cases/generate-code'

@Module({
  imports: [
    AppPeopleModule
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
    UserCreateUseCase,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    }
  ]
})
export class AppUserModule { }