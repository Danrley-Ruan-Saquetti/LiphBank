import { beforeEach, describe, expect, test, vi } from 'vitest'
import { UserFindUseCase } from '@application/use-cases/user/find.use-case'
import { User, UserType } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { People, PeopleType } from '@domain/entities/people.entity'
import { UserRepositoryMock } from '@tests/unit/shared/mocks/user/repository.mock'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'

describe('Application - User - UseCase - Find', () => {
  let userFindUseCase: UserFindUseCase
  let peopleRepository: PeopleRepositoryMock
  let userRepository: UserRepositoryMock

  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    peopleRepository = new PeopleRepositoryMock()

    const module = await createApplicationMock({
      providers: [
        UserFindUseCase,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: PeopleRepository,
          useValue: peopleRepository,
        },
      ],
    })

    userFindUseCase = module.get(UserFindUseCase)
  })

  test('Should find a user', async () => {
    const arrange = {
      id: 1
    }

    vi.spyOn(userRepository, 'findById').mockImplementation((id: number) => new User({
      id,
      peopleId: 1,
      active: true,
      code: 'USR-EXAMPLE',
      login: 'dan@test.com',
      type: UserType.CLIENT,
    }))

    vi.spyOn(peopleRepository, 'findById').mockImplementation((id) => new People({
      id,
      name: 'Danrley',
      type: PeopleType.NATURAL_PERSON,
      cpfCnpj: '10254710913',
    }))

    const response = await userFindUseCase.perform(arrange)

    expect(response.user).toBeInstanceOf(User)
    expect(response.people).toBeInstanceOf(People)
    expect(response.user.id).toEqual(1)
    expect(response.user.active).toEqual(true)
    expect(response.user.code).toEqual('USR-EXAMPLE')
    expect(response.user.login).toEqual('dan@test.com')
    expect(response.user.type).toEqual(UserType.CLIENT)
    expect(response.people.id).toEqual(1)
    expect(response.people.cpfCnpj).toEqual('10254710913')
    expect(response.people.type).toEqual(PeopleType.NATURAL_PERSON)
    expect(response.people.name).toEqual('Danrley')
  })
})