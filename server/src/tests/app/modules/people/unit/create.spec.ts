import { describe, expect, test, vi } from 'vitest'
import { createMockPeopleRepository } from '@tests/app/modules/people/unit/base-components'
import { People } from '@app/modules/people/model'
import { ValidationException } from '@adapters/validator/validation.exception'
import { PeopleFactory } from '@tests/app/modules/people/factory'

describe('Create People', () => {

  test('Simple create people - CPF with dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    const response = await createPeopleUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
  })

  test('Simple create people - CPF without dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '10254710913',
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    const response = await createPeopleUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
  })

  test('Create people - Natural Person', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      type: People.Type.NATURAL_PERSON,
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    const response = await createPeopleUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
  })

  test('Create people - Legal Entity with dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '48.626.911/0001-55',
      type: People.Type.LEGAL_ENTITY,
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    const response = await createPeopleUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('48626911000155')
    expect(response.people.type).equal(People.Type.LEGAL_ENTITY)
  })

  test('Create people - Legal Entity without dots', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '48626911000155',
      type: People.Type.LEGAL_ENTITY,
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    const response = await createPeopleUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('48626911000155')
    expect(response.people.type).equal(People.Type.LEGAL_ENTITY)
  })

  test('Create people with all fields', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      gender: People.Gender.MASCULINE,
      type: People.Type.NATURAL_PERSON,
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    const response = await createPeopleUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
    expect(response.people.gender).equal(People.Gender.MASCULINE)
    expect(response.people.dateOfBirth!.getTime()).equal(new Date('2004-05-28 00:00:00').getTime())
  })

  test('Create people with pass empty value', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      dateOfBirth: null,
      gender: null,
      type: undefined,
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    const response = await createPeopleUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
    expect(response.people.gender).equal(null)
    expect(response.people.dateOfBirth).equal(null)
  })

  test('Not enable to create - Invalid name empty', async () => {
    const arrange = {
      name: '',
      cpfCnpj: '102.547.109-13',
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    await expect(async () => {
      try {
        await createPeopleUseCase.perform(arrange)
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
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      dateOfBirth: now,
    }

    const createPeopleUseCase = PeopleFactory.createFactory()

    await expect(async () => {
      try {
        await createPeopleUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('dateOfBirth', 'date_greater_current_date').length).toBe(1)
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

    peopleRepositoryMock.findByCpfCnpj = vi.fn().mockImplementation(cpfCnpj => People.load({ id: 1, cpfCnpj: cpfCnpj }))

    const createPeopleUseCase = PeopleFactory.createFactory({ peopleRepository: peopleRepositoryMock })

    await expect(async () => {
      try {
        await createPeopleUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('cpfCnpj', '_already_exists').length).toBe(1)
        }

        throw error
      }
    })
      .rejects
      .toThrow(ValidationException)
  })
})