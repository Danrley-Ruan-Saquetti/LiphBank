import { Module } from '@nestjs/common'
import { DatabaseTransaction } from '@adapters/database/transaction'
import { DatabaseTransactionPrisma } from '@adapters/database/infra/transaction'

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