import { describe, expect, test, vi } from 'vitest'
import { createMockPeopleRepository } from './base-components'
import { People } from '../../../../../app/modules/people/model'
import { PeopleUpdateUseCase } from '../../../../../app/modules/people/use-cases/update'
import { ValidationException } from '../../../../../adapters/validator/validation.exception'

describe('Update People', () => {
  const peopleRepositoryMock = createMockPeopleRepository()

  peopleRepositoryMock.findById = vi.fn().mockImplementation(id => People.load({
    id: id,
    name: 'Dan Ruan',
    cpfCnpj: '10254710913',
    dateOfBirth: new Date('2004-05-28 00:00:00'),
    gender: People.Gender.MASCULINE,
    type: People.Type.NATURAL_PERSON,
    createdAt: new Date('2024-12-05 10:00:00'),
    updatedAt: new Date('2024-12-05 10:00:00'),
  }))

  test('Simple update people', async () => {
    const arrange = {
      id: 1,
      name: 'Jon Joe',
      gender: People.Gender.FEMININE,
      dateOfBirth: new Date('2001-01-01 01:01:01'),
    }

    const updatePeople = new PeopleUpdateUseCase(peopleRepositoryMock)

    const response = await updatePeople.perform(arrange)

    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Jon Joe')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
    expect(response.people.gender).equal(People.Gender.FEMININE)
    expect(response.people.dateOfBirth!.getTime()).equal(new Date('2001-01-01 01:01:01').getTime())
  })

  test('Update people - inform null in optional fields', async () => {
    const arrange = {
      id: 1,
      dateOfBirth: null,
      gender: null,
    }

    const updatePeople = new PeopleUpdateUseCase(peopleRepositoryMock)

    const response = await updatePeople.perform(arrange)

    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
    expect(response.people.gender).equal(null)
    expect(response.people.dateOfBirth).equal(null)
  })

  test('Not allowed update people - People not found - id not registered', async () => {
    const arrange = {
      id: 0,
      name: 'Danrley',
    }

    peopleRepositoryMock.findById = vi.fn().mockResolvedValue(null)

    const updatePeople = new PeopleUpdateUseCase(peopleRepositoryMock)

    await expect(async () => {
      try {
        await updatePeople.perform(arrange)
      } catch (error) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('id', 'notFound').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })

  test('Not allowed update people - Data invalid', async () => {
    const now = new Date(Date.now())
    now.setSeconds(now.getSeconds() + 10)

    const arrange = {
      id: 1,
      name: '',
      gender: 'unknown' as any,
      dateOfBirth: now,
    }

    peopleRepositoryMock.findById = vi.fn().mockResolvedValue(null)

    const updatePeople = new PeopleUpdateUseCase(peopleRepositoryMock)

    await expect(async () => {
      try {
        await updatePeople.perform(arrange)
      } catch (error) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('name', 'too_small').length).equal(1)
          expect(error.getCausesByPath('gender', 'invalid_enum_value').length).equal(1)
          expect(error.getCausesByPath('dateOfBirth', 'date_greater_current_date').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})