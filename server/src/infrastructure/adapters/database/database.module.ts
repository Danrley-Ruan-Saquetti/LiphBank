import { Module } from '@nestjs/common'
import { PrismaDatabaseService } from '@infrastructure/adapters/database/prisma.service'
import { Database } from '@domain/database'

@Module({
  providers: [
    PrismaDatabaseService,
    {
      provide: Database,
      useClass: PrismaDatabaseService
    }
  ],
  exports: [
    PrismaDatabaseService
  ]
})
export class InfrastructureDatabaseModule {

}