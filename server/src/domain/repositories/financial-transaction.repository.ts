import { BankAccountProps } from '@domain/entities/bank-account.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'
import { FinancialTransaction, FinancialTransactionProps } from '@domain/entities/financial-transaction.entity'

interface FinancialTransactionFilterArgs extends Omit<FinancialTransactionProps, 'type' | 'situation'> {
  type: 'enum'
  situation: 'enum'
  bankAccount: BankAccountProps
}

export type FinancialTransactionFilter = FilterSchema<FinancialTransactionFilterArgs>
export type FinancialTransactionQueryArgs = QuerySchema<FinancialTransactionFilterArgs>

export abstract class FinancialTransactionRepository {

  abstract create(financialTransaction: FinancialTransaction): Promise<FinancialTransaction>
  abstract update(id: number, financialTransaction: FinancialTransaction): Promise<FinancialTransaction>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<FinancialTransaction | null>
  abstract findMany(args?: FinancialTransactionQueryArgs): Promise<FinancialTransaction[]>
}