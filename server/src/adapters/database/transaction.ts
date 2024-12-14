export abstract class DatabaseTransaction {

  abstract transaction<T = any>(handler: () => Promise<T>): Promise<T>
}