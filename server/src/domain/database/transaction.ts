export abstract class DatabaseTransaction {

  abstract transaction<T extends any | void = void>(handler: () => T | Promise<T>): Promise<T>
}