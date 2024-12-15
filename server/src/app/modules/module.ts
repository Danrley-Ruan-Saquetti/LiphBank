import { Module } from '@nestjs/common'
import { PeopleModule } from './people/module'
import { UserModule } from './user/module'
import { AppSharedModule } from './shared/module'

@Module({
  imports: [
    PeopleModule,
    UserModule,
    AppSharedModule,
  ]
})
export class AppModules { }