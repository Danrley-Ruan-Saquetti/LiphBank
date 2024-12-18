import { Module } from '@nestjs/common'
import { env } from '@env'
import { AuthSignInUseCase } from '@app/modules/auth/use-cases/sign-in'
import { AppUserModule } from '../user/module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: env('JWT_SECRET')
    }),
    AppUserModule,
  ],
  providers: [
    AuthSignInUseCase,
  ]
})
export class AppAuthModule { }