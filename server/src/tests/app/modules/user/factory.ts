import { UserGenerateCodeUseCase } from '@app/modules/user/use-cases/generate-code'
import { createMockPeopleRepository } from '@tests/app/modules/people/unit/base-components'
import { PeopleFactory } from '@tests/app/modules/people/factory'
import { UserRepository } from '@app/modules/user/repository'
import { UserCreateUseCase } from '@app/modules/user/use-cases/create'
import { createMockUserRepository } from '@tests/app/modules/user/unit/base-components'
import { PeopleRepository } from '@app/modules/people/repository'

export class UserFactory {

  static createFactory({
    userRepository = createMockUserRepository(),
    peopleRepository = createMockPeopleRepository()
  }: {
    userRepository?: UserRepository
    peopleRepository?: PeopleRepository
  } = {}) {
    return new UserCreateUseCase(userRepository, PeopleFactory.findFactory({ peopleRepository }), UserFactory.generateCodeFactory({ userRepository }))
  }

  static generateCodeFactory({
    userRepository = createMockUserRepository()
  }: {
    userRepository?: UserRepository
  } = {}) {
    return new UserGenerateCodeUseCase(userRepository)
  }
}