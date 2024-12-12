import { describe, expect, test, vi } from 'vitest'
import { UserCreateUseCase } from '../../../../../app/modules/user/use-cases/create'
import { People } from '../../../../../app/modules/people/model'
import { User } from '../../../../../app/modules/user/model'
import { createMockPeopleRepository } from '../../people/unit/base-components'
import { PeopleFindUseCase } from '../../../../../app/modules/people/use-cases/find'

describe('Create User', function () {

  test('Create User with People', async function () {
    const arrange = {
      peopleId: 1,
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER,
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    peopleRepositoryMock.findById = vi.fn().mockImplementation(id => People.load({
      id,
      name: 'Dan Ruan',
      cpfCnpj: '10254710913',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      gender: People.Gender.MASCULINE,
      type: People.Type.NATURAL_PERSON,
      createdAt: new Date('2024-12-05 10:00:00'),
      updatedAt: new Date('2024-12-05 10:00:00'),
    }))

    const userCreateUseCase = new UserCreateUseCase(
      new PeopleFindUseCase(
        peopleRepositoryMock
      )
    )

    const response = await userCreateUseCase.perform(arrange)

    expect(response.user).toBeInstanceOf(User)
    expect(response.user.id).equal(1)
    expect(response.user.login).equal('dan@gmail.com')
    expect(response.user.type).equal('C')
    expect(response.people).toBeInstanceOf(People)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
  })
})