import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaDatabaseService } from '@infrastructure/adapters/database/prisma.service'

@Module({
  providers: [
    {
      provide: PrismaClient,
      useClass: PrismaDatabaseService
    }
  ],
  exports: [
    PrismaDatabaseService
  ]
})
export class DatabaseModule {

}