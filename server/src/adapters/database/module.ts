import { Module } from '@nestjs/common'
import { DatabaseTransaction } from './transaction'
import { DatabaseTransactionPrisma } from './infra/transaction'

@Module({
  providers: [
    {
      provide: DatabaseTransaction,
      useClass: DatabaseTransactionPrisma,
    }
  ],
  exports: [
    {
      provide: DatabaseTransaction,
      useClass: DatabaseTransactionPrisma,
    }
  ]
})
export class DatabaseAdapterModule { }