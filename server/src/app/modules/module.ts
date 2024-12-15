import { Module } from '@nestjs/common'
import { PeopleModule } from '@app/modules/people/module'
import { UserModule } from '@app/modules/user/module'
import { AppSharedModule } from '@app/modules/shared/module'

@Module({
  imports: [
    PeopleModule,
    UserModule,
    AppSharedModule,
  ]
})
export class AppModules { }