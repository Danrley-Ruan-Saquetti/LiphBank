import { ErrorLog as ErrorLogPrisma } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'

export type ErrorLogProps = ErrorLogPrisma

export class ErrorLog implements ErrorLogProps {

  private _id: string
  private _origin: string
  private _message: string
  private _details: JsonValue
  private _createdAt: Date

  get id() { return this._id }
  get origin() { return this._origin }
  get message() { return this._message }
  get details() { return this._details }
  get createdAt() { return this._createdAt }

  set id(value) { this._id = value }
  set origin(value) { this._origin = value }
  set message(value) { this._message = value }
  set details(value) { this._details = value }
  set createdAt(value) { this._createdAt = value }

  constructor(props: Partial<ErrorLogProps> = {}) {
    this.id = props.id!
    this.origin = props.origin!
    this.message = props.message!
    this.details = props.details!
    this.createdAt = props.createdAt!
  }

  static load(props: Partial<ErrorLogProps>) {
    return new ErrorLog(props)
  }

  toJSON(): ErrorLogProps {
    return {
      id: this.id,
      origin: this.origin,
      message: this.message,
      details: this.details,
      createdAt: this.createdAt,
    }
  }
}