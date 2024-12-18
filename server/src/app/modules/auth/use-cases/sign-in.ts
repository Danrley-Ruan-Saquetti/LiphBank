import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { User } from '@app/modules/user/model'
import { UserRepository } from '@app/modules/user/repository'
import { ValidationException } from '@adapters/validator/validation.exception'

const authSignInSchema = z.object({
  login: z
    .string()
    .trim(),
  password: z
    .string(),
  type: z
    .nativeEnum(User.Type)
})

export type AuthSignInUseCaseArgs = z.input<typeof authSignInSchema>

@Injectable()
export class AuthSignInUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {
    super()
  }

  async perform(args: AuthSignInUseCaseArgs) {
    const { login, password, type } = this.validator.validate(authSignInSchema, args)

    const user = await this.userRepository.findByLoginAndType(login, type)

    const isValidPassword = user && await this.validatePasswordUser(user, password)

    if (!isValidPassword) {
      throw new ValidationException('Unable to sign in', [
        {
          message: 'Login or password invalid',
          path: ['login', 'password', '_not_found']
        }
      ])
    }

    const payload = {
      sub: user.id,
      code: user.code,
    }

    const token = await this.jwtService.signAsync(payload)

    return {
      token,
      payload,
    }
  }

  private async validatePasswordUser(user: User, password: string) {
    return await bcrypt.compare(password, user.password)
  }
}