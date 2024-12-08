import { vi } from 'vitest'
import { PeopleRepository } from '../repository'
import { People, PeopleType } from '../model'

export const createMockPeopleRepository = () => {
  let countId = 0

  const peopleRepositoryMock: PeopleRepository = {
    create: vi.fn().mockImplementation((people: People) => {
      people.id = ++countId

      if (!people.type) people.type = PeopleType.NATURAL_PERSON
      if (!people.createdAt) people.createdAt = new Date(Date.now())
      if (!people.updatedAt) people.updatedAt = new Date(Date.now())

      return people
    }),
    findByCpfCnpj: vi.fn().mockResolvedValue(null),
  }

  return peopleRepositoryMock
}