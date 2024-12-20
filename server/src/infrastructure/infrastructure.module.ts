import { Module } from '@nestjs/common'
import { InfrastructureDatabaseModule } from '@infrastructure/adapters/database/database.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'

@Module({
  imports: [
    InfrastructureDatabaseModule,
    InfrastructureRepositoryModule,
    InfrastructureValidatorModule
  ]
})
export class InfrastructureModule {

}