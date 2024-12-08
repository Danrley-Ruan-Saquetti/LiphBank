import { vi } from 'vitest'
import { PeopleRepository } from '../use-cases/create'

export const createMockPeopleRepository = () => {
  const peopleRepositoryMock: PeopleRepository = {
    findByCpfCnpj: vi.fn().mockResolvedValueOnce(null),
  }

  return peopleRepositoryMock
}