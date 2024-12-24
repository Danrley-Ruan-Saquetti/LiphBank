import { Module } from '@nestjs/common'
import { JWTServiceImplementation } from '@infrastructure/adapters/jwt/jwt.service'
import { JWT } from '@domain/adapters/jwt/index'

@Module({
  providers: [
    JWTServiceImplementation,
    {
      provide: JWT,
      useClass: JWTServiceImplementation
    }
  ],
  exports: [
    JWTServiceImplementation,
    {
      provide: JWT,
      useClass: JWTServiceImplementation
    }
  ]
})
export class InfrastructureJWTModule { }