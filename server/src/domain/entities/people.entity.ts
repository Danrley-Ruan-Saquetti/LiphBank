import { People as PeoplePrisma } from '@prisma/client'

export enum PeopleType {
  NATURAL_PERSON = 'NP',
  LEGAL_ENTITY = 'LE',
}

export enum PeopleGender {
  MASCULINE = 'M',
  FEMININE = 'F',
}

export interface PeopleProps extends PeoplePrisma {
  type: PeopleType
  gender: PeopleGender | null
}

export class People implements PeopleProps {

  private _id: number
  private _name: string
  private _type: PeopleType
  private _cpfCnpj: string
  private _gender: PeopleGender
  private _dateOfBirth: Date
  private _createdAt: Date
  private _updatedAt: Date

  get id() { return this._id }
  get name() { return this._name }
  get type() { return this._type }
  get cpfCnpj() { return this._cpfCnpj }
  get gender() { return this._gender }
  get dateOfBirth() { return this._dateOfBirth }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  set id(value) { this._id = value }
  set name(value) { this._name = value }
  set type(value) { this._type = value }
  set cpfCnpj(value) { this._cpfCnpj = value }
  set gender(value) { this._gender = value }
  set dateOfBirth(value) { this._dateOfBirth = value }
  set createdAt(value) { this._createdAt = value }
  set updatedAt(value) { this._updatedAt = value }

  constructor(props: Partial<PeopleProps> = {}) {
    this.id = props.id!
    this.name = props.name!
    this.type = props.type!
    this.cpfCnpj = props.cpfCnpj!
    this.gender = props.gender!
    this.dateOfBirth = props.dateOfBirth!
    this.createdAt = props.createdAt!
    this.updatedAt = props.updatedAt!
  }

  static load(props: Partial<PeopleProps>) {
    return new People(props)
  }

  toJSON(): PeopleProps {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      cpfCnpj: this.cpfCnpj,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}