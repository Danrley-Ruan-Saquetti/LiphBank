import { describe, expect, Mock, test, vi } from 'vitest'
import { createMockPeopleRepository } from '@tests/app/modules/people/unit/base-components'
import { People } from '@app/modules/people/model'
import { ValidationException } from '@adapters/validator/validation.exception'
import { PeopleFactory } from '@tests/app/modules/people/factory'

describe('Delete People', () => {

  test('Simple delete people', async () => {
    const arrange = {
      id: 1,
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    peopleRepositoryMock.findById = vi.fn().mockResolvedValue(People.load({
      id: 1,
    }))

    const deletePeopleUseCase = PeopleFactory.deleteFactory({ peopleRepository: peopleRepositoryMock })

    await deletePeopleUseCase.perform(arrange)

    const results = (peopleRepositoryMock.findById as any) as Mock

    expect((await results.mock.results[0].value).id).equal(1)
  })

  test('Not allow delete people - People not found by id', async () => {
    const arrange = {
      id: 0,
    }

    const peopleRepositoryMock = createMockPeopleRepository()

    peopleRepositoryMock.findById = vi.fn().mockResolvedValue(null)

    const deletePeopleUseCase = PeopleFactory.deleteFactory({ peopleRepository: peopleRepositoryMock })

    await expect(async () => {
      try {
        await deletePeopleUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('id', '_not_found').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})