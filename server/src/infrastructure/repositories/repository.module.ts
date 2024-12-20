import { Module } from '@nestjs/common'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { PeopleRepositoryImplementation } from '@infrastructure/repositories/people.repository'

@Module({
  providers: [
    PeopleRepositoryImplementation,
    {
      provide: PeopleRepository,
      useClass: PeopleRepositoryImplementation
    }
  ],
  exports: [
    PeopleRepositoryImplementation
  ]
})
export class InfrastructureRepositoryModule {

}