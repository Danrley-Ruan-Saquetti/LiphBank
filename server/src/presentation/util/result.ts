export class Result<T> {

  get ok() { return this._ok }
  get status() { return this._status }
  get value() { return this._value }
  get error() { return this._error }

  private constructor(
    private readonly _ok: boolean = true,
    private readonly _status: number = 200,
    private readonly _value: T | null = null,
    private readonly _error: unknown | null = null,
  ) { }

  static success<T>(value: T, status = 200) {
    return new Result<T>(true, status, value, null)
  }

  static failure<T>(error: unknown, status = 400) {
    return new Result<T>(false, status, null, error)
  }

  toJSON() {
    return {
      ok: this.ok,
      status: this.status,
      value: this.value,
      error: this.error,
    }
  }
}