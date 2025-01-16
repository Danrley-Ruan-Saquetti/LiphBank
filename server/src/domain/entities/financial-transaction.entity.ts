import { FinancialTransaction as FinancialTransactionPrisma } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'

export enum FinancialTransactionType {
  EXPENSE = 'E',
  INCOME = 'I',
}

export enum FinancialTransactionFrequency {
  DAILY = 'D',
  WEEKLY = 'W',
  MONTHLY = 'M',
  QUARTERLY = 'Q',
  SEMIANNUALLY = 'S',
  ANNUALLY = 'A',
}

export enum FinancialTransactionTypeOccurrence {
  SINGLE = 'S',
  PROGRAMMATIC = 'P',
}

export enum FinancialTransactionSituation {
  PENDING = 'PE',
  PAID_OUT = 'PO',
  RECEIVED = 'RV',
  LATE = 'LT',
  CANCELED = 'CN',
}

export type FinancialTransactionSettings = {
  timesToRepeat: number | null
  countRepeatedOccurrences: number
  typeOccurrence: FinancialTransactionTypeOccurrence
  frequency: FinancialTransactionFrequency | null
}

export interface FinancialTransactionProps extends FinancialTransactionPrisma {
  type: FinancialTransactionType
  situation: FinancialTransactionSituation
  settings: FinancialTransactionSettings
}

export class FinancialTransaction implements FinancialTransactionProps {

  private _type: FinancialTransactionType
  private _situation: FinancialTransactionSituation
  private _id: number
  private _bankAccountId: number
  private _title: string
  private _description: string
  private _value: number
  private _senderRecipient: string
  private _expiresIn: Date | null
  private _dateTimeCompetence: Date
  private _settings: FinancialTransactionSettings
  private _createdAt: Date
  private _updatedAt: Date

  get type() { return this._type }
  get situation() { return this._situation }
  get id() { return this._id }
  get bankAccountId() { return this._bankAccountId }
  get title() { return this._title }
  get description() { return this._description }
  get value() { return this._value }
  get senderRecipient() { return this._senderRecipient }
  get expiresIn() { return this._expiresIn }
  get dateTimeCompetence() { return this._dateTimeCompetence }
  get settings() { return this._settings }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  set type(value) { this._type = value }
  set situation(value) { this._situation = value }
  set id(value) { this._id = value }
  set bankAccountId(value) { this._bankAccountId = value }
  set title(value) { this._title = value }
  set description(value) { this._description = value }
  set value(value) { this._value = value }
  set senderRecipient(value) { this._senderRecipient = value }
  set expiresIn(value) { this._expiresIn = value }
  set dateTimeCompetence(value) { this._dateTimeCompetence = value }
  set settings(value) { this._settings = value }
  set createdAt(value) { this._createdAt = value }
  set updatedAt(value) { this._updatedAt = value }

  constructor(props: Partial<FinancialTransactionProps> = {}) {
    this.id = props.id!
    this.bankAccountId = props.bankAccountId!
    this.createdAt = props.createdAt!
    this.dateTimeCompetence = props.dateTimeCompetence!
    this.description = props.description!
    this.expiresIn = props.expiresIn!
    this.senderRecipient = props.senderRecipient!
    this.settings = props.settings ?? FinancialTransaction.getDefaultSettings()
    this.situation = props.situation ?? FinancialTransactionSituation.PENDING
    this.title = props.title!
    this.type = props.type!
    this.updatedAt = props.updatedAt!
    this.value = props.value!
  }

  static load(props: Partial<FinancialTransactionProps>) {
    return new FinancialTransaction(props)
  }

  toJSON(): FinancialTransactionProps {
    return {
      id: this.id,
      bankAccountId: this.bankAccountId,
      createdAt: this.createdAt,
      dateTimeCompetence: this.dateTimeCompetence,
      description: this.description,
      expiresIn: this.expiresIn,
      senderRecipient: this.senderRecipient,
      settings: this.settings,
      situation: this.situation,
      title: this.title,
      type: this.type,
      updatedAt: this.updatedAt,
      value: this.value,
    }
  }

  static getDefaultSettings(): FinancialTransactionSettings {
    return {
      timesToRepeat: null,
      countRepeatedOccurrences: 0,
      typeOccurrence: FinancialTransactionTypeOccurrence.SINGLE,
      frequency: null,
    }
  }
}