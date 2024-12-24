import { UseCase } from '@application/use-cases/use-case'
import { UserRepository } from '@domain/repositories/user.repository'

export class AuthSignInUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) {
    super()
  }

  async perform() { }
}