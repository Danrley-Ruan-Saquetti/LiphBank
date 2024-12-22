import { UserMapper } from '@infrastructure/mappers/user.mapper'
import { Database } from '@domain/database'
import { User, UserType } from '@domain/entities/user.entity'
import { UserQueryArgs, UserRepository } from '@domain/repositories/user.repository'

export class UserRepositoryImplementation extends UserRepository {

  constructor(
    private readonly database: Database
  ) {
    super()
  }

  async create(user: User) {
    try {
      const userModel = UserMapper.entityToDatabase(user)

      const userDatabase = await this.database.user.create({
        data: {
          code: userModel.code,
          login: userModel.login,
          password: userModel.password,
          type: userModel.type,
          active: userModel.active,
          lastAccess: userModel.lastAccess,
          peopleId: userModel.peopleId,
        }
      })

      return UserMapper.databaseToEntity(userDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async update(id: number, user: User) {
    try {
      const userModel = UserMapper.entityToDatabase(user)

      const userDatabase = await this.database.user.update({
        where: { id },
        data: {
          code: userModel.code,
          login: userModel.login,
          password: userModel.password,
          type: userModel.type,
          active: userModel.active,
          lastAccess: userModel.lastAccess,
          peopleId: userModel.peopleId,
        }
      })

      return UserMapper.databaseToEntity(userDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async delete(id: number) {
    try {
      await this.database.user.delete({ where: { id } })
    } catch (error: any) {

      throw error
    }
  }

  async findMany(args: UserQueryArgs = {}) {
    try {
      const usersDatabase = await this.database.user.findMany({ ...args } as any)

      return UserMapper.multiDatabaseToEntity(usersDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findById(id: number) {
    try {
      const userDatabase = await this.database.user.findUnique({ where: { id } })

      return userDatabase ? UserMapper.databaseToEntity(userDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findByCode(code: string) {
    try {
      const userDatabase = await this.database.user.findUnique({ where: { code } })

      return userDatabase ? UserMapper.databaseToEntity(userDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findByPeopleIdAndType(peopleId: number, type: UserType) {
    try {
      const userDatabase = await this.database.user.findFirst({ where: { peopleId, type } })

      return userDatabase ? UserMapper.databaseToEntity(userDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findByLoginAndType(login: string, type: UserType) {
    try {
      const userDatabase = await this.database.user.findFirst({ where: { login, type } })

      return userDatabase ? UserMapper.databaseToEntity(userDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }
}