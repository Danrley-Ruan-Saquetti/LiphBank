import { PeopleFactory } from '@tests/app/modules/people/factory'
import { describe, expect, test, vi } from 'vitest'
import { createMockPeopleRepository } from '@tests/app/modules/people/unit/base-components'
import { People } from '@app/modules/people/model'
import { ValidationException } from '@adapters/validator/validation.exception'

describe('Find People', () => {
  test('Simple find people', async () => {
    const arrange = {
      id: 1
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

    const peopleFindUseCase = PeopleFactory.findFactory({ peopleRepository: peopleRepositoryMock })

    const response = await peopleFindUseCase.perform(arrange)

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

    const peopleFindUseCase = PeopleFactory.findFactory({ peopleRepository: peopleRepositoryMock })

    await expect(async () => {
      try {
        await peopleFindUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('id', '_not_found').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})