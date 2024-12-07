export interface CauseException {
  message: string
  path?: string
}

export class Exception extends Error {

  constructor(
    message: string,
    public readonly causes: CauseException[] = []
  ) {
    super(message)
  }

  getCausesByPath(path: string) {
    return this.causes.filter(cause => cause.path.split('.').includes(path))
  }
}