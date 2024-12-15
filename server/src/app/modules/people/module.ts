import { Module } from '@nestjs/common'
import { PeopleCreateUseCase } from './use-cases/create'
import { PeopleDeleteUseCase } from './use-cases/delete'
import { PeopleFindUseCase } from './use-cases/find'
import { PeopleUpdateUseCase } from './use-cases/update'
import { PeoplePrismaRepository } from './infra/repository'
import { PeopleRepository } from './repository'

@Module({
  providers: [
    PeopleCreateUseCase,
    PeopleDeleteUseCase,
    PeopleFindUseCase,
    PeopleUpdateUseCase,
    {
      provide: PeopleRepository,
      useClass: PeoplePrismaRepository,
    }
  ],
  exports: [
    PeopleFindUseCase,
    PeopleCreateUseCase,
  ]
})
export class PeopleModule { }