import { Module } from '@nestjs/common'
import { AuthSignInUseCase } from './use-cases/sign-in'
import { AppUserModule } from '../user/module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: '21313fdvd'
    }),
    AppUserModule,
  ],
  providers: [
    AuthSignInUseCase,
  ]
})
export class AppAuthModule { }