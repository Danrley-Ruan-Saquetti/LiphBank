import { describe, expect, test, assert } from 'vitest'
import { People, PeopleCreateUseCase } from '../use-cases/create'
import { ValidationException } from '../../../../adapters/validator/validation.exception'

describe('Create People', () => {

  test('Simple create people', async () => {
    const arrange = {
      name: 'Dan Ruan',
      itinCnpj: '102.547.109-13',
      genre: 'M',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      type: 'NP',
    }

    const createPeople = new PeopleCreateUseCase()

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
    expect(response.user.id).equal(1)
  })

  test('Invalid name empty', async () => {
    const arrange = {
      name: '',
      itinCnpj: '102.547.108-13',
      genre: 'M',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      type: 'NP',
    }

    const createPeople = new PeopleCreateUseCase()

    await expect(async () => {
      try {
        await createPeople.perform(arrange)
      } catch (error) {
        expect(error.message).equal('Invalid data')

        throw error
      }
    })
      .rejects
      .toThrow(ValidationException)
  })
})