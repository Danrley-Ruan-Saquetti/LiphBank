import { User as UserPrisma } from '@prisma/client'

export enum UserType {
  CUSTOMER = 'C',
  ADMIN = 'A',
}

export interface UserProps extends UserPrisma {
  type: UserType
}

export class User implements UserProps {
  static readonly Type = UserType

  private _type: UserType
  private _id: number
  private _peopleId: number
  private _active: boolean
  private _code: string
  private _login: string
  private _password: string
  private _lastAccess: Date
  private _createdAt: Date
  private _updatedAt: Date

  set type(value) { this._type = value }
  set id(value) { this._id = value }
  set peopleId(value) { this._peopleId = value }
  set active(value) { this._active = value }
  set code(value) { this._code = value }
  set login(value) { this._login = value }
  set password(value) { this._password = value }
  set lastAccess(value) { this._lastAccess = value }
  set createdAt(value) { this._createdAt = value }
  set updatedAt(value) { this._updatedAt = value }

  get type() { return this._type }
  get id() { return this._id }
  get peopleId() { return this._peopleId }
  get active() { return this._active }
  get code() { return this._code }
  get login() { return this._login }
  get password() { return this._password }
  get lastAccess() { return this._lastAccess }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  static load(props: Partial<UserProps>) {
    const people = new User()

    if (props.type) people.type = props.type
    if (props.id) people.id = props.id
    if (props.peopleId) people.peopleId = props.peopleId
    if (props.active) people.active = props.active
    if (props.code) people.code = props.code
    if (props.login) people.login = props.login
    if (props.password) people.password = props.password
    if (props.lastAccess) people.lastAccess = props.lastAccess
    if (props.createdAt) people.createdAt = props.createdAt
    if (props.updatedAt) people.updatedAt = props.updatedAt

    return people
  }
}