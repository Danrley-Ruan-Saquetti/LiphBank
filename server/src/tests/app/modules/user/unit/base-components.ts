import { Mock, vi } from 'vitest'
import { UserRepository } from '@app/modules/user/repository'
import { User } from '@app/modules/user/model'

export const createMockUserRepository = () => {
  let countId = 0

  const userRepositoryMock: UserRepository & Record<string, Mock> = {
    create: vi.fn().mockImplementation((user: User) => {
      user.id = ++countId
      user.createdAt = new Date(Date.now())
      user.updatedAt = new Date(Date.now())

      if (user.active === undefined || user.active === null) user.active = true
      if (!user.lastAccess) user.lastAccess = new Date(Date.now())

      return user
    }),
    update: vi.fn().mockImplementation((id: number, user: User) => {
      user.id = id

      user.updatedAt = new Date(Date.now())

      return user
    }),
    findById: vi.fn().mockResolvedValue(null),
    findByPeopleIdAndType: vi.fn().mockResolvedValue(null),
    findByLoginAndType: vi.fn().mockResolvedValue(null),
    findByCode: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(undefined),
  }

  return userRepositoryMock
}