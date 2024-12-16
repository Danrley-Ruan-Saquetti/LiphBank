import { AuthSignInUseCase } from '@app/modules/auth/use-cases/sign-in'
import { UserRepository } from '@app/modules/user/repository'
import { createMockUserRepository } from '@tests/app/modules/user/unit/base-components'

export class AuthFactory {

  static signInFactory({
    userRepository = createMockUserRepository()
  }: {
    userRepository?: UserRepository
  } = {}) {
    return new AuthSignInUseCase(userRepository)
  }
}