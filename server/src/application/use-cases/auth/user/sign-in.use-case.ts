import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { UserJWTPayload } from '@application/types/user-jwt-payload.type'
import { AuthUserSignInEvent } from '@application/observer/events/auth/user/sign-in.event'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { SignInCredentialInvalidException } from '@application/exceptions/sign-in-credential-invalid.exception'
import { AuthUserSignInDTO, authUserSignInSchema } from '@application/dto/auth/user/sign-in.dto'
import { JWTService } from '@domain/adapters/jwt/jwt.service'
import { HashService } from '@domain/adapters/crypto/hash.service'
import { UserRepository } from '@domain/repositories/user.repository'
import { env } from '@shared/env'

@Injectable()
export class AuthUserSignInUseCase extends UseCase<AuthUserSignInEvent> {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: HashService,
    private readonly jwt: JWTService,
  ) {
    super()
  }

  async perform(args: AuthUserSignInDTO) {
    const { login, type, password } = this.validator.validate(authUserSignInSchema, args)

    const user = await this.userRepository.findByLoginAndType(login, type)

    if (!user) {
      throw new SignInCredentialInvalidException()
    }

    const isSamePassword = await this.hash.compare(password, user.password)

    if (!isSamePassword) {
      throw new SignInCredentialInvalidException()
    }

    if (!user.active) {
      throw new UnauthorizedException('This currently inactive user account')
    }

    user.lastAccess = new Date(Date.now())

    await this.userRepository.update(user.id, user)

    const payload: UserJWTPayload = {
      sub: user.id,
      peopleId: user.peopleId,
      code: user.code,
    }

    const token = this.jwt.encode(payload, {
      secret: env('JWT_USER_SECRET'),
      exp: env('JWT_USER_EXPIRATION'),
    })

    await this.notify('events.auth.user.sign-in', { user })

    return { token, payload }
  }
}