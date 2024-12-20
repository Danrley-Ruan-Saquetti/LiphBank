import { PrismaClient } from '@prisma/client'
import { PeopleMapper } from '@infrastructure/mappers/people.mapper'
import { People } from '@domain/entities/people.entity'
import { PeopleQueryArgs, PeopleRepository } from '@domain/repositories/people.repository'

export class PeopleRepositoryImplementation extends PeopleRepository {

  constructor(
    private readonly prisma: PrismaClient
  ) {
    super()
  }

  async create(people: People) {
    try {
      const peopleModel = PeopleMapper.entityToDatabase(people)

      const peopleDatabase = await this.prisma.people.create({
        data: {
          cpfCnpj: peopleModel.cpfCnpj,
          name: peopleModel.name,
          gender: peopleModel.gender,
          type: peopleModel.type,
          dateOfBirth: peopleModel.dateOfBirth,
        }
      })

      return PeopleMapper.databaseToEntity(peopleDatabase)
    } catch (error: any) {

      throw error
    }
  }

  async update(id: number, people: People) {
    try {
      const peopleModel = PeopleMapper.entityToDatabase(people)

      const peopleDatabase = await this.prisma.people.update({
        where: { id },
        data: {
          cpfCnpj: peopleModel.cpfCnpj,
          name: peopleModel.name,
          gender: peopleModel.gender,
          type: peopleModel.type,
          dateOfBirth: peopleModel.dateOfBirth,
        }
      })

      return PeopleMapper.databaseToEntity(peopleDatabase)
    } catch (error: any) {

      throw error
    }
  }

  async delete(id: number) {
    try {
      await this.prisma.people.delete({ where: { id } })
    } catch (error: any) {

      throw error
    }
  }

  async findMany(args: PeopleQueryArgs = {}) {
    try {
      const peoplesDatabase = await this.prisma.people.findMany({ ...args } as any)

      return PeopleMapper.multiDatabaseToEntity(peoplesDatabase)
    } catch (error: any) {

      throw error
    }
  }

  async findById(id: number) {
    try {
      const peopleDatabase = await this.prisma.people.findUnique({ where: { id } })

      return peopleDatabase ? PeopleMapper.databaseToEntity(peopleDatabase) : null
    } catch (error: any) {

      throw error
    }
  }

  async findByCpfCnpj(cpfCnpj: string) {
    try {
      const peopleDatabase = await this.prisma.people.findUnique({ where: { cpfCnpj } })

      return peopleDatabase ? PeopleMapper.databaseToEntity(peopleDatabase) : null
    } catch (error: any) {

      throw error
    }
  }
}