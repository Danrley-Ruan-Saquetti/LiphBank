import { describe, expect, test, assert } from 'vitest'
import { People, PeopleCreateUseCase } from '../use-cases/create'

describe('Create People', () => {

  test('Simple create people', async () => {
    const arrange = {
      name: 'Dan Ruan',
      itinCnpj: '102.547.108-13',
      genre: 'M',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      type: 'P',
    }

    const createPeople = new PeopleCreateUseCase()

    const response = await createPeople.perform(arrange)

    expect(response.user).toBeInstanceOf(People)
  })

  test('Invalid name empty', async () => {
    const arrange = {
      name: '',
      itinCnpj: '102.547.108-13',
      genre: 'M',
      dateOfBirth: new Date('2004-05-28 00:00:00'),
      type: 'P',
    }

    const createPeople = new PeopleCreateUseCase()

    await expect(createPeople.perform(arrange)).rejects.toThrow('Name is required')
  })
})