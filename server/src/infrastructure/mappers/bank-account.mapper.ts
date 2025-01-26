import { BankAccountModel } from '@infrastructure/models/bank-account.model'
import { BankAccount } from '@domain/entities/bank-account.entity'

export class BankAccountMapper {

  static multiEntityToDatabase(entities: BankAccount[]) {
    return entities.map(entity => BankAccountMapper.databaseToEntity(entity))
  }

  static multiDatabaseToEntity(databaseModels: BankAccountModel[]) {
    return databaseModels.map(databaseModel => BankAccountMapper.databaseToEntity(databaseModel))
  }

  static entityToDatabase(entity: BankAccount) {
    const bankAccountDatabase: BankAccountModel = {
      id: entity.id,
      name: entity.name,
      active: entity.active,
      balance: entity.balance,
      code: entity.code,
      createdAt: entity.createdAt,
      peopleId: entity.peopleId,
      updatedAt: entity.updatedAt,
    }

    return bankAccountDatabase
  }

  static databaseToEntity(databaseModel: BankAccountModel) {
    return new BankAccount({
      id: databaseModel.id,
      name: databaseModel.name,
      active: databaseModel.active,
      balance: databaseModel.balance,
      code: databaseModel.code,
      createdAt: databaseModel.createdAt,
      peopleId: databaseModel.peopleId,
      updatedAt: databaseModel.updatedAt,
    })
  }
}