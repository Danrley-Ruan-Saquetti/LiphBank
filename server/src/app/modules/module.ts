import { Module } from '@nestjs/common'
import { AppPeopleModule } from '@app/modules/people/module'
import { AppUserModule } from '@app/modules/user/module'
import { AppSharedModule } from '@app/modules/shared/module'
import { AppAuthModule } from './auth/module'

@Module({
  imports: [
    AppPeopleModule,
    AppUserModule,
    AppSharedModule,
    AppAuthModule,
  ]
})
export class AppModules { }