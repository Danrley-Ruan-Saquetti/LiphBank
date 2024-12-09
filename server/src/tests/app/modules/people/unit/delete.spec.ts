import { describe, expect, Mock, test, vi } from 'vitest'
import { createMockPeopleRepository } from './base-components'
import { PeopleDeleteUseCase } from '../../../../../app/modules/people/use-cases/delete'
import { People } from '../../../../../app/modules/people/model'
import { ValidationException } from '../../../../../adapters/validator/validation.exception'

describe('Delete People', () => {

  test('Simple delete people', async () => {
    const arrange = {
      id: 1,
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    peopleRepositoryMock.findById = vi.fn().mockResolvedValue(People.load({
      id: 1,
    }))

    const deletePeople = new PeopleDeleteUseCase(peopleRepositoryMock)

    await deletePeople.perform(arrange)

    const results = (peopleRepositoryMock.findById as any) as Mock

    expect((await results.mock.results[0].value).id).equal(1)
  })

  test('Not allow delete people - People not found by id', async () => {
    const arrange = {
      id: 0,
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    peopleRepositoryMock.findById = vi.fn().mockResolvedValue(null)

    const deletePeople = new PeopleDeleteUseCase(peopleRepositoryMock)

    await expect(async () => {
      try {
        await deletePeople.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('id', 'not_found').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})