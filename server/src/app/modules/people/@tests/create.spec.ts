import { describe, expect, test, vi } from 'vitest'
import { PeopleCreateUseCase } from '../use-cases/create'
import { ValidationException } from '../../../../adapters/validator/validation.exception'
import { People } from '../model'
import { createMockPeopleRepository } from './base-components'

describe('Create People', () => {

  test('Simple create people - CPF with dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Simple create people - CPF without dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '10254710913',
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Create people - Natural Person', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      type: People.Type.NATURAL_PERSON,
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Create people - Legal Entity with dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '48.626.911/0001-55',
      type: People.Type.LEGAL_ENTITY,
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Create people - Legal Entity without dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '48626911000155',
      type: People.Type.LEGAL_ENTITY,
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Create people with all fields', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      gender: People.Gender.MASCULINE,
      type: People.Type.NATURAL_PERSON,
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Create people with pass empty value', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      dateOfBirth: null,
      gender: null,
      type: undefined,
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Not enable to create - Invalid name empty', async () => {
    const arrange = {
      name: '',
      cpfCnpj: '102.547.108-13',
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    await expect(async () => {
      try {
        await createPeople.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.message).equal('Invalid data')
          expect(error.getCausesByPath('name').length).toBe(1)
        }

        throw error
      }
    })
      .rejects
      .toThrow(ValidationException)
  })

  test('Not enable to create - Date of bird greater then current date', async () => {
    const now = new Date(Date.now())
    now.setSeconds(now.getSeconds() + 10)

    const arrange = {
      name: '',
      cpfCnpj: '102.547.108-13',
      dateOfBirth: now,
    }

    const createPeople = new PeopleCreateUseCase(createMockPeopleRepository())

    await expect(async () => {
      try {
        await createPeople.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('dateOfBirth').length).toBe(1)
        }

        throw error
      }
    })
      .rejects
      .toThrow(ValidationException)
  })

  test('Not enable to create - CPF/CNPJ already exists', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    peopleRepositoryMock.findByCpfCnpj = vi.fn().mockResolvedValueOnce(People.load({ id: 1, cpfCnpj: arrange.cpfCnpj }))

    const createPeople = new PeopleCreateUseCase(peopleRepositoryMock)

    await expect(async () => {
      try {
        await createPeople.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('cpfCnpj', 'already_exists').length).toBe(1)
        }

        throw error
      }
    })
      .rejects
      .toThrow(ValidationException)
  })
})