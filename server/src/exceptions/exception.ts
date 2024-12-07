export interface CauseException {
  message: string
  path: (string | number)[]
}

export class Exception extends Error {

  constructor(
    message: string,
    public readonly causes: CauseException[] = []
  ) {
    super(message)
  }

  getCausesByPath(...paths: (string | number)[]) {
    return this.causes.filter(cause => paths.every(path => cause.path.includes(path)))
  }
}