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
  PARTIALLY_PAID = 'PP',
  RECEIVED = 'RV',
  PARTIALLY_RECEIVED = 'PR',
  LATE = 'LT',
  CANCELED = 'CN',
}

export type FinancialTransactionSettings = {
  isObservable: false
  isSendNotification: false
  timesToRepeat: 0
  countRepeatedOccurrences: 0
  typeOccurrence: FinancialTransactionTypeOccurrence
  frequency: null
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

  static load(props: Partial<FinancialTransactionProps>) {
    const financialTransaction = new FinancialTransaction()

    if (props.id) financialTransaction.id = props.id
    if (props.bankAccountId) financialTransaction.bankAccountId = props.bankAccountId
    if (props.createdAt) financialTransaction.createdAt = props.createdAt
    if (props.dateTimeCompetence) financialTransaction.dateTimeCompetence = props.dateTimeCompetence
    if (props.description) financialTransaction.description = props.description
    if (props.expiresIn) financialTransaction.expiresIn = props.expiresIn
    if (props.senderRecipient) financialTransaction.senderRecipient = props.senderRecipient
    if (props.settings) financialTransaction.settings = props.settings
    if (props.situation) financialTransaction.situation = props.situation
    if (props.title) financialTransaction.title = props.title
    if (props.type) financialTransaction.type = props.type
    if (props.updatedAt) financialTransaction.updatedAt = props.updatedAt
    if (props.value) financialTransaction.value = props.value

    return financialTransaction
  }
}