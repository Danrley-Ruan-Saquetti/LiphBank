import { Module } from '@nestjs/common'
import { AppAuthModule } from '@app/modules/auth/module'
import { AppUserModule } from '@app/modules/user/module'
import { AppPeopleModule } from '@app/modules/people/module'
import { AppSharedModule } from '@app/modules/shared/module'

@Module({
  imports: [
    AppPeopleModule,
    AppUserModule,
    AppSharedModule,
    AppAuthModule,
  ]
})
export class AppModules { }