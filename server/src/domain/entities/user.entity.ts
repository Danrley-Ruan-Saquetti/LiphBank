import { User as UserPrisma } from '@prisma/client'

export enum UserType {
  CLIENT = 'C',
  ADMIN = 'A',
}

export interface UserProps extends UserPrisma {
  type: UserType
}

export class User {

  private _id: number
  private _peopleId: number
  private _type: UserType
  private _active: boolean
  private _code: string
  private _login: string
  private _password: string
  private _lastAccess: Date
  private _createdAt: Date
  private _updatedAt: Date

  get id() { return this._id }
  get peopleId() { return this._peopleId }
  get type() { return this._type }
  get active() { return this._active }
  get code() { return this._code }
  get login() { return this._login }
  get password() { return this._password }
  get lastAccess() { return this._lastAccess }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  set id(value) { this._id = value }
  set peopleId(value) { this._peopleId = value }
  set type(value) { this._type = value }
  set active(value) { this._active = value }
  set code(value) { this._code = value }
  set login(value) { this._login = value }
  set password(value) { this._password = value }
  set lastAccess(value) { this._lastAccess = value }
  set createdAt(value) { this._createdAt = value }
  set updatedAt(value) { this._updatedAt = value }

  static load(props: Partial<UserProps>) {
    const user = new User()

    if (props.id) user.id = props.id
    if (props.peopleId) user.peopleId = props.peopleId
    if (props.type) user.type = props.type
    if (props.active) user.active = props.active
    if (props.code) user.code = props.code
    if (props.login) user.login = props.login
    if (props.password) user.password = props.password
    if (props.lastAccess) user.lastAccess = props.lastAccess
    if (props.createdAt) user.createdAt = props.createdAt
    if (props.updatedAt) user.updatedAt = props.updatedAt

    return user
  }

  toJSON(): UserPrisma {
    return {
      id: this.id,
      peopleId: this.peopleId,
      type: this.type,
      active: this.active,
      code: this.code,
      login: this.login,
      password: this.password,
      lastAccess: this.lastAccess,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}