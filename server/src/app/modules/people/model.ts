import { People as PeoplePrisma } from '@prisma/client'

export type PeopleProps = PeoplePrisma

export enum PeopleType {
  NATURAL_PERSON = 'NP',
  LEGAL_ENTITY = 'LE',
}

export enum PeopleGender {
  MASCULINE = 'M',
  FEMININE = 'F',
}

export class People implements PeopleProps {
  static readonly Type = PeopleType
  static readonly Gender = PeopleGender

  private _id: number
  private _name: string
  private _type: PeopleType
  private _itinCnpj: string
  private _active: boolean
  private _gender: PeopleGender | null = null
  private _dateOfBirth: Date | null = null
  private _createdAt: Date
  private _updatedAt: Date

  get id() { return this._id }
  get name() { return this._name }
  get type() { return this._type }
  get itinCnpj() { return this._itinCnpj }
  get active() { return this._active }
  get gender() { return this._gender }
  get dateOfBirth() { return this._dateOfBirth }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  set id(value) { this._id = value }
  set name(value) { this._name = value }
  set type(value) { this._type = value }
  set itinCnpj(value) { this._itinCnpj = value }
  set active(value) { this._active = value }
  set gender(value) { this._gender = value }
  set dateOfBirth(value) { this._dateOfBirth = value }
  set createdAt(value) { this._createdAt = value }
  set updatedAt(value) { this._updatedAt = value }
}