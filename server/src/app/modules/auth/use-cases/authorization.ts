import { UseCase } from '@common/use-case'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { z } from 'zod'
import { ValidationException } from '../../../../adapters/validator/validation.exception'

const authorizationSchema = z.object({
  token: z
    .string()
    .trim()
})

export type AuthAuthorizationUseCaseArgs = z.input<typeof authorizationSchema>

@Injectable()
export class AuthAuthorizationUseCase extends UseCase {

  constructor(
    private readonly jwtService: JwtService
  ) {
    super()
  }

  async perform(args: AuthAuthorizationUseCaseArgs) {
    const { token: authorizationToken } = this.validator.validate(authorizationSchema, args)

    if (!authorizationToken) {
      throw new ValidationException('Unauthorized', [{ message: 'Authorization token not defined', path: ['authorization', 'required'] }])
    }

    if (authorizationToken.split(' ').length != 2) {
      throw new ValidationException('Unauthorized', [{ message: 'Invalid authorization token', path: ['authorization', '_format', '_invalid'] }])
    }

    const [bearer, token] = authorizationToken.split(' ')

    if (bearer !== 'Bearer') {
      throw new ValidationException('Unauthorized', [{ message: 'Invalid authorization bearer token format', path: ['bearer', '_invalid'] }])
    }

    try {
      const payload = await this.jwtService.verifyAsync(token)

      return { payload }
    } catch {
      throw new ValidationException('Unauthorized', [{ message: 'Invalid authorization token', path: ['token', '_invalid'] }])
    }
  }
}