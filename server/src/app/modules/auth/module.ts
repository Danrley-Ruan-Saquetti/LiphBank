import { Module } from '@nestjs/common'
import { AuthSignInUseCase } from './use-cases/sign-in'
import { AppUserModule } from '../user/module'

@Module({
  imports: [
    AppUserModule
  ],
  providers: [
    AuthSignInUseCase,
  ]
})
export class AppAuthModule { }