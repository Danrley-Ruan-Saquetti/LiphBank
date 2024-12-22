import { Module } from '@nestjs/common'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { InfrastructureDatabaseModule } from '@infrastructure/adapters/database/database.module'
import { UserRepositoryImplementation } from '@infrastructure/repositories/user.repository'
import { PeopleRepositoryImplementation } from '@infrastructure/repositories/people.repository'

@Module({
  imports: [
    InfrastructureDatabaseModule,
  ],
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
    {
      provide: PeopleRepository,
      useClass: PeopleRepositoryImplementation
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImplementation
    },
  ]
})
export class InfrastructureRepositoryModule {

}