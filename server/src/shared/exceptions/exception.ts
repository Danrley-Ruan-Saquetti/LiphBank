export class Exception extends Error {

  readonly timestamp = new Date(Date.now())

  constructor(
    message: string,
    public readonly details: Record<string, any> | null = null
  ) {
    super(message)
  }
}