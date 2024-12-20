import { Module } from '@nestjs/common'
import { InfrastructureDatabaseModule } from '@infrastructure/adapters/database/database.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

@Module({
  imports: [
    InfrastructureDatabaseModule,
    InfrastructureRepositoryModule
  ]
})
export class InfrastructureModule {

}