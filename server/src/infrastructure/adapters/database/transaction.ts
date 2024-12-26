import { Injectable } from '@nestjs/common'
import { Database } from '@domain/database'
import { DatabaseTransaction } from '@domain/database/transaction'

@Injectable()
export class PrismaDatabaseTransaction extends DatabaseTransaction {

  constructor(
    private readonly database: Database
  ) {
    super()
  }

  async transaction<T extends any | void = void>(handler: () => T | Promise<T>): Promise<T> {
    return await this.database.$transaction(async () => await handler())
  }
}