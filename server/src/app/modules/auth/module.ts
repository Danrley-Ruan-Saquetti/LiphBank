import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { env } from '@env'
import { AppUserModule } from '@app/modules/user/module'
import { AuthController } from '@app/modules/auth/controller'
import { AuthSignInUseCase } from '@app/modules/auth/use-cases/sign-in'
import { AuthAuthorizationUseCase } from '@app/modules/auth/use-cases/authorization'

@Module({
  imports: [
    JwtModule.register({
      secret: env('JWT_SECRET')
    }),
    AppUserModule,
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthSignInUseCase,
    AuthAuthorizationUseCase,
  ]
})
export class AppAuthModule { }