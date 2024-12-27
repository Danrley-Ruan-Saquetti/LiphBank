import { Module, Provider } from '@nestjs/common'
import { PrismaDatabaseService } from '@infrastructure/adapters/database/prisma.service'
import { PrismaDatabaseTransaction } from '@infrastructure/adapters/database/transaction'
import { Database } from '@domain/database'
import { DatabaseTransaction } from '@domain/database/transaction'

const providers: Provider[] = [
  {
    provide: Database,
    useClass: PrismaDatabaseService
  },
  {
    provide: DatabaseTransaction,
    useClass: PrismaDatabaseTransaction
  },
]

@Module({
  providers: [...providers],
  exports: [...providers]
})
export class InfrastructureDatabaseModule { }