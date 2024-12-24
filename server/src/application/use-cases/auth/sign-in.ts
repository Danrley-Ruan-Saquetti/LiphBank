import { UseCase } from '@application/use-cases/use-case'
import { AuthSignInDTO, authSignInSchema } from '@application/dto/auth/sign-in.dto'
import { UserRepository } from '@domain/repositories/user.repository'

export class AuthSignInUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) {
    super()
  }

  async perform(args: AuthSignInDTO) {
    const { login, password } = this.validator.validate(authSignInSchema, args)

  }
}