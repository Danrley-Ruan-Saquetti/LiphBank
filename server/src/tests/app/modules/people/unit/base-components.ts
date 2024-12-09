import { vi } from 'vitest'
import { PeopleRepository } from '../../../../../app/modules/people/repository'
import { People } from '../../../../../app/modules/people/model'

export const createMockPeopleRepository = () => {
  let countId = 0

  const peopleRepositoryMock: PeopleRepository = {
    create: vi.fn().mockImplementation((people: People) => {
      people.id = ++countId
      people.createdAt = new Date(Date.now())
      people.updatedAt = new Date(Date.now())

      if (!people.type) people.type = People.Type.NATURAL_PERSON

      return people
    }),
    update: vi.fn().mockImplementation((id: number, people: People) => {
      people.id = id

      people.updatedAt = new Date(Date.now())

      return people
    }),
    findById: vi.fn().mockResolvedValue(null),
    findByCpfCnpj: vi.fn().mockResolvedValue(null),
  }

  return peopleRepositoryMock
}