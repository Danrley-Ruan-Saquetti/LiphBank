import { BankAccountProps } from '@domain/entities/bank-account.entity'
import { QuerySchema, UpdateSchema } from '@domain/adapters/database/operations'
import { FilterSchema } from '@domain/adapters/database/filters'
import { FinancialTransaction, FinancialTransactionProps } from '@domain/entities/financial-transaction.entity'

interface FinancialTransactionFilterArgs extends Omit<FinancialTransactionProps, 'type' | 'situation'> {
  type: 'enum'
  situation: 'enum'
  bankAccount: BankAccountProps
}

export type FinancialTransactionFilter = FilterSchema<FinancialTransactionFilterArgs>
export type FinancialTransactionQueryArgs = QuerySchema<FinancialTransactionFilterArgs>
export type FinancialTransactionUpdateArgs = UpdateSchema<FinancialTransactionFilterArgs, FinancialTransactionProps>

export abstract class FinancialTransactionRepository {

  abstract create(financialTransaction: FinancialTransaction): Promise<FinancialTransaction>
  abstract update(id: number, financialTransaction: FinancialTransaction): Promise<FinancialTransaction>
  abstract updateMany(args: FinancialTransactionUpdateArgs): Promise<void>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<FinancialTransaction | null>
  abstract findMany(args?: FinancialTransactionQueryArgs): Promise<FinancialTransaction[]>
}