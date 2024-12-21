import { vi } from 'vitest'
import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'

export class UserRepositoryMock extends UserRepository {

  private lastId = 0

  create = vi.fn().mockImplementation((user: User) => {
    user.id = ++this.lastId

    user.createdAt = new Date(Date.now())
    user.updatedAt = new Date(Date.now())

    return user
  })

  update = vi.fn().mockImplementation((user: User) => {
    user.updatedAt = new Date(Date.now())

    return user
  })

  delete = vi.fn().mockImplementation(() => { })

  findById = vi.fn().mockImplementation(() => null)

  findMany = vi.fn().mockImplementation(() => [])

  findByCpfCnpj = vi.fn().mockImplementation(() => null)
}