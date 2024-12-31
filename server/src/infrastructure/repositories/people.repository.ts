import { Injectable } from '@nestjs/common'
import { PeopleMapper } from '@infrastructure/mappers/people.mapper'
import { People, PeopleProps } from '@domain/entities/people.entity'
import { Database } from '@domain/database'
import { PeopleQueryArgs, PeopleRepository } from '@domain/repositories/people.repository'

@Injectable()
export class PeopleRepositoryImplementation extends PeopleRepository {

  constructor(
    private readonly database: Database
  ) {
    super()

    this.database.setSchemaFilter<PeopleProps>({
      cpfCnpj: 'string',
      dateOfBirth: 'date',
      gender: 'enum',
      name: 'string',
      createdAt: 'date',
      id: 'number',
      type: 'enum',
      updatedAt: 'date',
    })
  }

  async create(people: People) {
    try {
      const peopleModel = PeopleMapper.entityToDatabase(people)

      const peopleDatabase = await this.database.people.create({
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
      this.database.resolveError(error)
    }
  }

  async update(id: number, people: People) {
    try {
      const peopleModel = PeopleMapper.entityToDatabase(people)

      const peopleDatabase = await this.database.people.update({
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
      this.database.resolveError(error)
    }
  }

  async delete(id: number) {
    try {
      await this.database.people.delete({ where: { id } })
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findMany(args: PeopleQueryArgs = {}) {
    try {
      const peoplesDatabase = await this.database.people.findMany({
        ...args as any,
        where: this.database.pipeWhere(args.where || {}),
      })

      return PeopleMapper.multiDatabaseToEntity(peoplesDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findById(id: number) {
    try {
      const peopleDatabase = await this.database.people.findUnique({ where: { id } })

      return peopleDatabase ? PeopleMapper.databaseToEntity(peopleDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findByCpfCnpj(cpfCnpj: string) {
    try {
      const peopleDatabase = await this.database.people.findUnique({ where: { cpfCnpj } })

      return peopleDatabase ? PeopleMapper.databaseToEntity(peopleDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }
}