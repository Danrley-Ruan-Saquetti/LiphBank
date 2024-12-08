import { vi } from 'vitest'
import { PeopleRepository } from '../repository'

export const createMockPeopleRepository = () => {
  const peopleRepositoryMock: PeopleRepository = {
    findByCpfCnpj: vi.fn().mockResolvedValueOnce(null),
  }

  return peopleRepositoryMock
}