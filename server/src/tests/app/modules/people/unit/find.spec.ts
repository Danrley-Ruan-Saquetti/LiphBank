import { describe, expect, test, vi } from 'vitest'
import { createMockPeopleRepository } from './base-components'
import { PeopleFindUseCase } from '../../../../../app/modules/people/use-cases/find'
import { People } from '../../../../../app/modules/people/model'
import { ValidationException } from '../../../../../adapters/validator/validation.exception'

describe('Find People', () => {
  test('Simple find people', async () => {
    const arrange = {
      id: 1
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    peopleRepositoryMock.findById = vi.fn().mockResolvedValue(People.load({
      id: arrange.id,
      name: 'Dan Ruan',
      cpfCnpj: '10254710913',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      gender: People.Gender.MASCULINE,
      type: People.Type.NATURAL_PERSON,
      createdAt: new Date('2024-12-05 10:00:00'),
      updatedAt: new Date('2024-12-05 10:00:00'),
    }))

    const peopleFind = new PeopleFindUseCase(peopleRepositoryMock)

    const response = await peopleFind.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).equal(1)
    expect(response.people.name).equal('Dan Ruan')
    expect(response.people.cpfCnpj).equal('10254710913')
    expect(response.people.dateOfBirth!.getTime()).equal(new Date('2004-05-28 00:00:00').getTime())
    expect(response.people.gender).equal(People.Gender.MASCULINE)
    expect(response.people.type).equal(People.Type.NATURAL_PERSON)
    expect(response.people.createdAt.getTime()).equal(new Date('2024-12-05 10:00:00').getTime())
    expect(response.people.updatedAt.getTime()).equal(new Date('2024-12-05 10:00:00').getTime())
  })

  test('People not found by id', async () => {
    const arrange = {
      id: 1
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    const peopleFind = new PeopleFindUseCase(peopleRepositoryMock)

    await expect(async () => {
      try {
        await peopleFind.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('id', 'not_found').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})