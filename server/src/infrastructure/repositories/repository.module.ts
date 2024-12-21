import { Module } from '@nestjs/common'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { UserRepositoryImplementation } from '@infrastructure/repositories/user.repository'
import { PeopleRepositoryImplementation } from '@infrastructure/repositories/people.repository'

@Module({
  providers: [
    PeopleRepositoryImplementation,
    UserRepositoryImplementation,
    {
      provide: PeopleRepository,
      useClass: PeopleRepositoryImplementation
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImplementation
    },
  ],
  exports: [
    PeopleRepositoryImplementation,
    UserRepositoryImplementation,
  ]
})
export class InfrastructureRepositoryModule {

}