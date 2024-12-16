import { Module } from '@nestjs/common'
import { PeopleCreateUseCase } from '@app/modules/people/use-cases/create'
import { PeopleDeleteUseCase } from '@app/modules/people/use-cases/delete'
import { PeopleFindUseCase } from '@app/modules/people/use-cases/find'
import { PeopleUpdateUseCase } from '@app/modules/people/use-cases/update'
import { PeoplePrismaRepository } from '@app/modules/people/infra/repository'
import { PeopleRepository } from '@app/modules/people/repository'

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
export class AppPeopleModule { }