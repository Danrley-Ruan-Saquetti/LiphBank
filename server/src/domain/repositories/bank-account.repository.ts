import { PeopleProps } from '@domain/entities/people.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'
import { BankAccount, BankAccountProps } from '@domain/entities/bank-account.entity'

interface BankAccountFilterArgs extends BankAccountProps {
  people: PeopleProps
}

export type BankAccountFilter = FilterSchema<BankAccountFilterArgs>
export type BankAccountQueryArgs = QuerySchema<BankAccountFilterArgs>

export abstract class BankAccountRepository {

  abstract create(bankAccount: BankAccount): Promise<BankAccount>
  abstract update(id: number, bankAccount: BankAccount): Promise<BankAccount>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<BankAccount | null>
  abstract findByCode(code: string): Promise<BankAccount | null>
  abstract findMany(args?: BankAccountQueryArgs): Promise<BankAccount[]>
}