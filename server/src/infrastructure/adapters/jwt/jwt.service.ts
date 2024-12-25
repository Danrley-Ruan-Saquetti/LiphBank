import { JwtService } from '@nestjs/jwt'
import { JWT, JWTOptions } from '@domain/adapters/jwt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JWTServiceImplementation extends JWT {

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