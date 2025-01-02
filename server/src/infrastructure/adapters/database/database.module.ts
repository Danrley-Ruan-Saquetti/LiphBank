import { Module, Provider } from '@nestjs/common'
import { PrismaDatabaseService } from '@infrastructure/adapters/database/prisma.service'
import { DatabaseService } from '@domain/database/database.service'

const providers: Provider[] = [
  {
    provide: DatabaseService,
    useClass: PrismaDatabaseService
  },
]

@Module({
  providers: [...providers],
  exports: [...providers]
})
export class InfrastructureDatabaseModule { }