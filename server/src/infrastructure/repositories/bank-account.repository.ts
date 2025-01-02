import { Injectable } from '@nestjs/common'
import { BankAccountMapper } from '@infrastructure/mappers/bank-account.mapper'
import { DatabaseService } from '@domain/database/database.service'
import { BankAccount, BankAccountProps } from '@domain/entities/bank-account.entity'
import { BankAccountQueryArgs, BankAccountRepository } from '@domain/repositories/bank-account.repository'

@Injectable()
export class BankAccountRepositoryImplementation extends BankAccountRepository {

  constructor(
    private readonly database: DatabaseService
  ) {
    super()

    this.database.setSchemaFilter<BankAccountProps>({
      active: 'boolean',
      balance: 'number',
      code: 'string',
      name: 'string',
      peopleId: 'number',
      createdAt: 'date',
      id: 'number',
      updatedAt: 'date',
    })
  }

  async create(bankAccount: BankAccount) {
    try {
      const bankAccountModel = BankAccountMapper.entityToDatabase(bankAccount)

      const bankAccountDatabase = await this.database.bankAccount.create({
        data: {
          code: bankAccountModel.code,
          name: bankAccountModel.name,
          active: bankAccountModel.active,
          balance: bankAccountModel.balance,
          peopleId: bankAccountModel.peopleId,
        }
      })

      return BankAccountMapper.databaseToEntity(bankAccountDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async update(id: number, bankAccount: BankAccount) {
    try {
      const bankAccountModel = BankAccountMapper.entityToDatabase(bankAccount)

      const bankAccountDatabase = await this.database.bankAccount.update({
        where: { id },
        data: {
          active: bankAccountModel.active,
          balance: bankAccountModel.balance,
          code: bankAccountModel.code,
          name: bankAccountModel.name,
          peopleId: bankAccountModel.peopleId,
        }
      })

      return BankAccountMapper.databaseToEntity(bankAccountDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async delete(id: number) {
    try {
      await this.database.bankAccount.delete({ where: { id } })
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findMany(args: BankAccountQueryArgs = {}) {
    try {
      const bankAccountsDatabase = await this.database.bankAccount.findMany({
        ...args as any,
        where: this.database.pipeWhere(args.where || {}),
      })

      return BankAccountMapper.multiDatabaseToEntity(bankAccountsDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findById(id: number) {
    try {
      const bankAccountDatabase = await this.database.bankAccount.findUnique({ where: { id } })

      return bankAccountDatabase ? BankAccountMapper.databaseToEntity(bankAccountDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findByCode(code: string) {
    try {
      const bankAccountDatabase = await this.database.bankAccount.findUnique({ where: { code } })

      return bankAccountDatabase ? BankAccountMapper.databaseToEntity(bankAccountDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }
}