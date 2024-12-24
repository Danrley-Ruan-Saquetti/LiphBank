import { UseCase } from '@application/use-cases/use-case'
import { AuthSignInDTO, authSignInSchema } from '@application/dto/auth/sign-in.dto'
import { SignInCredentialInvalidException } from '@application/exceptions/sign-in-credential-invalid.exception'
import { Hash } from '@domain/adapters/crypto/hash'
import { UserRepository } from '@domain/repositories/user.repository'

export class AuthSignInUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: Hash
  ) {
    super()
  }

  async perform(args: AuthSignInDTO) {
    const { login, type, password } = this.validator.validate(authSignInSchema, args)

    const user = await this.userRepository.findByLoginAndType(login, type)

    if (!user) {
      throw new SignInCredentialInvalidException({ login })
    }

    const isSamePassword = await this.hash.compare(password, user.password)

    if (!isSamePassword) {
      throw new SignInCredentialInvalidException({ password })
    }

    const payload = {
      sub: user.id,
      code: user.code,
    }

    const token = ''

    return { token, payload }
  }
}