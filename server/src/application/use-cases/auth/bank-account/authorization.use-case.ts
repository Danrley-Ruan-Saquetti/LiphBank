import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { AuthBankAccountAuthorizationDTO, authBankAccountAuthorizationSchema } from '@application/dto/auth/bank-account/authorization.dto'
import { JWT } from '@domain/adapters/jwt'

@Injectable()
export class AuthBankAccountAuthorizationUseCase extends UseCase {
  constructor(
    private readonly jwtService: JWT
  ) {
    super()
  }

  async perform(args: AuthBankAccountAuthorizationDTO) {
    const { token: authorizationToken } = this.validator.validate(authBankAccountAuthorizationSchema, args)

    if (!authorizationToken) {
      throw new UnauthorizedException('Unauthorized', [{ message: 'Authorization token not defined', path: ['authorization', 'required'] }])
    }

    if (authorizationToken.split(' ').length != 2) {
      throw new UnauthorizedException('Unauthorized', [{ message: 'Invalid authorization token', path: ['authorization', '_format', '_invalid'] }])
    }

    const [bearer, token] = authorizationToken.split(' ')

    if (bearer !== 'Bearer') {
      throw new UnauthorizedException('Unauthorized', [{ message: 'Invalid authorization bearer token format', path: ['bearer', '_invalid'] }])
    }

    try {
      const payload = await this.jwtService.decode(token)

      return { payload }
    } catch {
      throw new UnauthorizedException('Unauthorized', [{ message: 'Invalid authorization token', path: ['token', '_invalid'] }])
    }
  }
}