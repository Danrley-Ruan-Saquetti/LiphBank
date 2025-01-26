import { BankAccount as BankAccountPrisma } from '@prisma/client'
import { ObjectRequiredProps } from '@shared/types'

export type BankAccountProps = BankAccountPrisma

export type BankAccountConstructor = ObjectRequiredProps<BankAccountProps, 'peopleId' | 'name' | 'code'>

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

  constructor(props: BankAccountConstructor) {
    this.id = props.id!
    this.name = props.name
    this.code = props.code
    this.peopleId = props.peopleId
    this.balance = props.balance ?? 0
    this.active = props.active ?? true
    this.updatedAt = props.updatedAt!
    this.createdAt = props.createdAt!
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