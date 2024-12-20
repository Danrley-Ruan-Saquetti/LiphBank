import { PeopleModel } from '@infrastructure/models/people.model'
import { People, PeopleGender, PeopleType } from '@domain/entities/people.entity'

export class PeopleMapper {

  static multiEntityToDatabase(entities: People[]) {
    return entities.map(entity => PeopleMapper.databaseToEntity(entity))
  }

  static multiDatabaseToEntity(databaseModels: PeopleModel[]) {
    return databaseModels.map(databaseModel => PeopleMapper.databaseToEntity(databaseModel))
  }

  static entityToDatabase(entity: People) {
    const peopleDatabase: PeopleModel = {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      cpfCnpj: entity.cpfCnpj,
      gender: entity.gender,
      dateOfBirth: entity.dateOfBirth,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    }

    return peopleDatabase
  }

  static databaseToEntity(databaseModel: PeopleModel) {
    return People.load({
      id: databaseModel.id,
      name: databaseModel.name,
      type: databaseModel.type as PeopleType,
      cpfCnpj: databaseModel.cpfCnpj,
      gender: databaseModel.gender as PeopleGender,
      dateOfBirth: databaseModel.dateOfBirth,
      updatedAt: databaseModel.updatedAt,
      createdAt: databaseModel.createdAt,
    })
  }
}