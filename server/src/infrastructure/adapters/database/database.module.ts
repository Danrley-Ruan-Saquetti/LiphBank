import { Module, Provider } from '@nestjs/common'
import { PrismaDatabaseService } from '@infrastructure/adapters/database/prisma.service'
import { Database } from '@domain/database'

const providers: Provider[] = [
  {
    provide: Database,
    useClass: PrismaDatabaseService
  },
]

@Module({
  providers: [...providers],
  exports: [...providers]
})
export class InfrastructureDatabaseModule { }