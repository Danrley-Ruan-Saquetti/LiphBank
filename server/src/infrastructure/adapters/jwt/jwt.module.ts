import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JWTServiceImplementation } from '@infrastructure/adapters/jwt/jwt.service'
import { JWTService } from '@domain/adapters/jwt/jwt.service'

@Module({
  imports: [
    JwtModule.register({})
  ],
  providers: [
    {
      provide: JWTService,
      useClass: JWTServiceImplementation
    }
  ],
  exports: [
    {
      provide: JWTService,
      useClass: JWTServiceImplementation
    }
  ]
})
export class InfrastructureJWTModule { }