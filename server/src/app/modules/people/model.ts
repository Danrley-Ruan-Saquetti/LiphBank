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
  type: PeopleType | null
  gender: PeopleGender | null
}

export class People implements PeopleProps {
  static readonly Type = PeopleType
  static readonly Gender = PeopleGender

  private _id: number
  private _name: string
  private _type: PeopleType
  private _cpfCnpj: string
  private _gender: PeopleGender | null = null
  private _dateOfBirth: Date | null = null
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

  static load(props: Partial<PeopleProps>) {
    const people = new People()

    if (props.id) people.id = props.id
    if (props.name) people.name = props.name
    if (props.type) people.type = props.type
    if (props.cpfCnpj) people.cpfCnpj = props.cpfCnpj
    if (props.gender) people.gender = props.gender
    if (props.dateOfBirth) people.dateOfBirth = props.dateOfBirth
    if (props.createdAt) people.createdAt = props.createdAt
    if (props.updatedAt) people.updatedAt = props.updatedAt

    return people
  }
}