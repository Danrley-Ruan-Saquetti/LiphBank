import { BankAccount } from '@domain/entities/bank-account.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'

export type BankAccountFilter = FilterSchema<BankAccount>
export type BankAccountQueryArgs = QuerySchema<BankAccount>

export abstract class BankAccountRepository {

  abstract create(bankAccount: BankAccount): Promise<BankAccount>
  abstract update(id: number, bankAccount: BankAccount): Promise<BankAccount>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<BankAccount | null>
  abstract findMany(args?: BankAccountQueryArgs): Promise<BankAccount[]>
}