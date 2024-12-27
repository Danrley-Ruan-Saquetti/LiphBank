import { FinancialTransaction } from '@domain/entities/financial-transaction.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'

export type FinancialTransactionFilter = FilterSchema<FinancialTransaction>
export type FinancialTransactionQueryArgs = QuerySchema<FinancialTransaction>

export abstract class FinancialTransactionRepository {

  abstract create(financialTransaction: FinancialTransaction): Promise<FinancialTransaction>
  abstract update(id: number, financialTransaction: FinancialTransaction): Promise<FinancialTransaction>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<FinancialTransaction | null>
  abstract findMany(args?: FinancialTransactionQueryArgs): Promise<FinancialTransaction[]>
}