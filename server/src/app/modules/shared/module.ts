import { Module } from '@nestjs/common'
import { CreatePeopleAndUserUseCase } from '@app/modules/shared/use-cases/create-people-user'
import { AppPeopleModule } from '@app/modules/people/module'
import { AppUserModule } from '@app/modules/user/module'
import { DatabaseAdapterModule } from '@adapters/database/module'

@Module({
  imports: [
    AppPeopleModule,
    AppUserModule,
    DatabaseAdapterModule,
  ],
  providers: [
    CreatePeopleAndUserUseCase
  ]
})
export class AppSharedModule { }