import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { FinancialTransactionMapper } from '@infrastructure/mappers/financial-transaction.mapper'
import { Database } from '@domain/database'
import { FinancialTransaction } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionQueryArgs, FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionRepositoryImplementation extends FinancialTransactionRepository {

  constructor(
    private readonly database: Database
  ) {
    super()
  }

  async create(financialTransaction: FinancialTransaction) {
    try {
      const financialTransactionModel = FinancialTransactionMapper.entityToDatabase(financialTransaction)

      const financialTransactionDatabase = await this.database.financialTransaction.create({
        data: {
          senderRecipient: financialTransactionModel.senderRecipient,
          title: financialTransactionModel.title,
          type: financialTransactionModel.type,
          value: financialTransactionModel.value,
          bankAccountId: financialTransactionModel.bankAccountId,
          dateTimeCompetence: financialTransactionModel.dateTimeCompetence,
          description: financialTransactionModel.description,
          expiresIn: financialTransactionModel.expiresIn,
          settings: financialTransactionModel.settings as Prisma.InputJsonObject,
          situation: financialTransactionModel.situation,
        }
      })

      return FinancialTransactionMapper.databaseToEntity(financialTransactionDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async update(id: number, financialTransaction: FinancialTransaction) {
    try {
      const financialTransactionModel = FinancialTransactionMapper.entityToDatabase(financialTransaction)

      const financialTransactionDatabase = await this.database.financialTransaction.update({
        where: { id },
        data: {
          senderRecipient: financialTransactionModel.senderRecipient,
          title: financialTransactionModel.title,
          type: financialTransactionModel.type,
          value: financialTransactionModel.value,
          bankAccountId: financialTransactionModel.bankAccountId,
          dateTimeCompetence: financialTransactionModel.dateTimeCompetence,
          description: financialTransactionModel.description,
          expiresIn: financialTransactionModel.expiresIn,
          settings: financialTransactionModel.settings as Prisma.InputJsonObject,
          situation: financialTransactionModel.situation,
        }
      })

      return FinancialTransactionMapper.databaseToEntity(financialTransactionDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async delete(id: number) {
    try {
      await this.database.financialTransaction.delete({ where: { id } })
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findMany(args: FinancialTransactionQueryArgs = {}) {
    try {
      const financialTransactionsDatabase = await this.database.financialTransaction.findMany({ ...args } as any)

      return FinancialTransactionMapper.multiDatabaseToEntity(financialTransactionsDatabase)
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }

  async findById(id: number) {
    try {
      const financialTransactionDatabase = await this.database.financialTransaction.findUnique({ where: { id } })

      return financialTransactionDatabase ? FinancialTransactionMapper.databaseToEntity(financialTransactionDatabase) : null
    } catch (error: any) {
      this.database.resolveError(error)
    }
  }
}