import { describe, expect, test, vi } from 'vitest'
import { UserCreateUseCase } from '../../../../../app/modules/user/use-cases/create'
import { People } from '../../../../../app/modules/people/model'
import { User } from '../../../../../app/modules/user/model'
import { createMockPeopleRepository } from '../../people/unit/base-components'
import { PeopleFindUseCase } from '../../../../../app/modules/people/use-cases/find'
import { createMockUserRepository } from './base-components'
import { ValidationException } from '../../../../../adapters/validator/validation.exception'
import { UserGenerateCodeUseCase } from '../../../../../app/modules/user/use-cases/generate-code'

describe('Create User', function () {

  test('Create User with People', async function () {
    const arrange = {
      peopleId: 1,
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER,
    }

    const peopleRepositoryMock = createMockPeopleRepository()
    const userRepositoryMock = createMockUserRepository()

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
      userRepositoryMock,
      new PeopleFindUseCase(
        peopleRepositoryMock
      ),
      new UserGenerateCodeUseCase(
        userRepositoryMock
      )
    )

    const response = await userCreateUseCase.perform(arrange)

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

  test('Unable to register a user who already has a registration for the same person and type', async function () {
    const arrange = {
      peopleId: 1,
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER,
    }

    const peopleRepositoryMock = createMockPeopleRepository()
    const userRepositoryMock = createMockUserRepository()

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

    userRepositoryMock.findByPeopleIdAndType = vi.fn().mockImplementation((peopleId, type) => User.load({
      id: 1,
      peopleId,
      type,
      login: 'user.already.register@gmail.com',
      active: true,
      password: 'Dan!@#123',
    }))

    const userCreateUseCase = new UserCreateUseCase(
      userRepositoryMock,
      new PeopleFindUseCase(
        peopleRepositoryMock
      ),
      new UserGenerateCodeUseCase(
        userRepositoryMock
      )
    )

    await expect(async () => {
      try {
        await userCreateUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('peopleId', 'type', '_already_exists').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })

  test('Unable to register a user who already has a registration for the same login and type', async function () {
    const arrange = {
      peopleId: 1,
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER,
    }

    const peopleRepositoryMock = createMockPeopleRepository()
    const userRepositoryMock = createMockUserRepository()

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

    userRepositoryMock.findByLoginAndType = vi.fn().mockImplementation((login, type) => User.load({
      id: 1,
      peopleId: 2,
      login,
      type,
      active: true,
      password: 'Dan!@#123',
    }))


    const userCreateUseCase = new UserCreateUseCase(
      userRepositoryMock,
      new PeopleFindUseCase(
        peopleRepositoryMock
      ),
      new UserGenerateCodeUseCase(
        userRepositoryMock
      )
    )

    await expect(async () => {
      try {
        await userCreateUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('login', 'type', '_already_exists').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})