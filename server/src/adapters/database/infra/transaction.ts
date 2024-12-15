import { Injectable } from '@nestjs/common'
import { DatabaseTransaction } from '../transaction'

@Injectable()
export class DatabaseTransactionPrisma extends DatabaseTransaction {

  transaction<T = any>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.')
  }
}