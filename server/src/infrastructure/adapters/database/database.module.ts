import { Module } from '@nestjs/common'
import { PrismaDatabaseService } from '@infrastructure/adapters/database/prisma.service'
import { PrismaDatabaseTransaction } from '@infrastructure/adapters/database/transaction'
import { Database } from '@domain/database'
import { DatabaseTransaction } from '@domain/database/transaction'

@Module({
  providers: [
    PrismaDatabaseService,
    PrismaDatabaseTransaction,
    {
      provide: Database,
      useClass: PrismaDatabaseService
    },
    {
      provide: DatabaseTransaction,
      useClass: PrismaDatabaseTransaction
    },
  ],
  exports: [
    PrismaDatabaseService,
    PrismaDatabaseTransaction,
    {
      provide: Database,
      useClass: PrismaDatabaseService
    },
    {
      provide: DatabaseTransaction,
      useClass: PrismaDatabaseTransaction
    },
  ]
})
export class InfrastructureDatabaseModule { }