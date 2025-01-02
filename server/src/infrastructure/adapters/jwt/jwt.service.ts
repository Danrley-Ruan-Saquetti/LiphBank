import { JwtService } from '@nestjs/jwt'
import { JWTService, JWTOptions } from '@domain/adapters/jwt/jwt.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JWTServiceImplementation extends JWTService {

  constructor(
    private jwtService: JwtService
  ) {
    super()
  }

  encode(payload: Record<string, unknown>, { secret, exp, algorithm = 'HS256' }: JWTOptions) {
    return this.jwtService.sign(payload, { algorithm, secret, expiresIn: exp })
  }

  decode<Payload extends object = any>(token: string) {
    return this.jwtService.decode<Payload>(token)
  }
}