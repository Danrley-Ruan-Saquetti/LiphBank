import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JWTServiceImplementation } from '@infrastructure/adapters/jwt/jwt.service'
import { JWT } from '@domain/adapters/jwt'

@Module({
  imports: [
    JwtModule.register({})
  ],
  providers: [
    {
      provide: JWT,
      useClass: JWTServiceImplementation
    }
  ],
  exports: [
    {
      provide: JWT,
      useClass: JWTServiceImplementation
    }
  ]
})
export class InfrastructureJWTModule { }