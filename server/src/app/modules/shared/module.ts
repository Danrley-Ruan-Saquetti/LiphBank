import { Module } from '@nestjs/common'
import { CreatePeopleAndUserUseCase } from './use-cases/create-people-user'
import { PeopleModule } from '../people/module'
import { UserModule } from '../user/module'
import { DatabaseAdapterModule } from '../../../adapters/database/module'

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