import { BankAccount as BankAccountPrisma } from '@prisma/client'

export type BankAccountProps = BankAccountPrisma

export class BankAccount implements BankAccountProps {
  private _code: string
  private _name: string
  private _id: number
  private _peopleId: number
  private _balance: number
  private _active: boolean
  private _createdAt: Date
  private _updatedAt: Date

  get code() { return this._code }
  get name() { return this._name }
  get id() { return this._id }
  get peopleId() { return this._peopleId }
  get balance() { return this._balance }
  get active() { return this._active }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  set code(value) { this._code = value }
  set name(value) { this._name = value }
  set id(value) { this._id = value }
  set peopleId(value) { this._peopleId = value }
  set balance(value) { this._balance = value }
  set active(value) { this._active = value }
  set createdAt(value) { this._createdAt = value }
  set updatedAt(value) { this._updatedAt = value }

  static load(props: Partial<BankAccountProps>) {
    const bankAccount = new BankAccount()

    if (props.id) bankAccount.id = props.id
    if (props.name) bankAccount.name = props.name
    if (props.code) bankAccount.code = props.code
    if (props.balance) bankAccount.balance = props.balance
    if (props.active) bankAccount.active = props.active
    if (props.peopleId) bankAccount.peopleId = props.peopleId
    if (props.updatedAt) bankAccount.updatedAt = props.updatedAt
    if (props.createdAt) bankAccount.createdAt = props.createdAt

    return bankAccount
  }

  toJSON(): BankAccountProps {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      balance: this.balance,
      active: this.active,
      peopleId: this.peopleId,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    }
  }
}