import { describe, expect, test, vi } from 'vitest'
import { CreatePeopleAndUser } from '../../../../../app/modules/shared/use-cases/create-people-user'
import { PeopleCreateUseCase } from '../../../../../app/modules/people/use-cases/create'
import { createMockPeopleRepository } from '../../people/unit/base-components'
import { UserCreateUseCase } from '../../../../../app/modules/user/use-cases/create'
import { createMockUserRepository } from '../../user/unit/base-components'
import { PeopleFindUseCase } from '../../../../../app/modules/people/use-cases/find'
import { DatabaseTransaction } from '../../../../../adapters/database/transaction'
import { UserGenerateCodeUseCase } from '../../../../../app/modules/user/use-cases/generate-code'
import { People } from '../../../../../app/modules/people/model'
import { User } from '../../../../../app/modules/user/model'

const databaseTransactionMock: DatabaseTransaction = {
  transaction: vi.fn().mockImplementation(async handler => await handler())
}

describe('Create User and People', () => {

  test('Create User with People', async () => {
    const arrange = {
      people: {
        name: 'Dan Ruan',
        cpfCnpj: '102.547.109-13',
        dateOfBirth: new Date('2004-05-28 00:00:00'),
        gender: People.Gender.MASCULINE,
        type: People.Type.NATURAL_PERSON,
      },
      user: {
        login: 'dan@gmail.com',
        password: 'Dan!@#123',
        type: User.Type.CUSTOMER,
      }
    }

    const peopleRepositoryMock = createMockPeopleRepository()
    const userRepositoryMock = createMockUserRepository()

    peopleRepositoryMock.findById = vi.fn().mockImplementation(() => People.load({
      id: 1,
      name: 'Dan Ruan',
      cpfCnpj: '10254710913',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      gender: People.Gender.MASCULINE,
      type: People.Type.NATURAL_PERSON,
    }))

    const createPeopleAndUserUseCase = new CreatePeopleAndUser(
      new PeopleCreateUseCase(
        peopleRepositoryMock
      ),
      new UserCreateUseCase(
        userRepositoryMock,
        new PeopleFindUseCase(
          peopleRepositoryMock
        ),
        new UserGenerateCodeUseCase(
          userRepositoryMock,
        )
      ),
      databaseTransactionMock
    )

    const response = await createPeopleAndUserUseCase.perform(arrange)

    expect(response.user).toBeInstanceOf(User)
    expect(response.user.id).equal(1)
    expect(response.user.login).equal('dan@gmail.com')
    expect(response.user.type).equal('C')
    expect(response.user.active).equal(true)
    expect(response.user.code.startsWith('USR#')).equal(true)
    expect(response.people).toBeInstanceOf(People)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
  })
})