import { PrismaClient } from '@prisma/client'
import { UserMapper } from '@infrastructure/mappers/user.mapper'
import { User } from '@domain/entities/user.entity'
import { UserQueryArgs, UserRepository } from '@domain/repositories/user.repository'

export class UserRepositoryImplementation extends UserRepository {

  constructor(
    private readonly prisma: PrismaClient
  ) {
    super()
  }

  async create(user: User) {
    try {
      const userModel = UserMapper.entityToDatabase(user)

      const userDatabase = await this.prisma.user.create({
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

      throw error
    }
  }

  async update(id: number, user: User) {
    try {
      const userModel = UserMapper.entityToDatabase(user)

      const userDatabase = await this.prisma.user.update({
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

      throw error
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } })
    } catch (error: any) {

      throw error
    }
  }

  async findMany(args: UserQueryArgs = {}) {
    try {
      const usersDatabase = await this.prisma.user.findMany({ ...args } as any)

      return UserMapper.multiDatabaseToEntity(usersDatabase)
    } catch (error: any) {

      throw error
    }
  }

  async findById(id: number) {
    try {
      const userDatabase = await this.prisma.user.findUnique({ where: { id } })

      return userDatabase ? UserMapper.databaseToEntity(userDatabase) : null
    } catch (error: any) {

      throw error
    }
  }
}