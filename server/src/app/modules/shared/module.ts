import { Module } from '@nestjs/common'
import { CreatePeopleAndUserUseCase } from '@app/modules/shared/use-cases/create-people-user'
import { PeopleModule } from '@app/modules/people/module'
import { UserModule } from '@app/modules/user/module'
import { DatabaseAdapterModule } from '@adapters/database/module'

@Module({
  imports: [
    PeopleModule,
    UserModule,
    DatabaseAdapterModule,
  ],
  providers: [
    CreatePeopleAndUserUseCase
  ]
})
export class AppSharedModule { }