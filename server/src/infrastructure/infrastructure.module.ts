import { Module } from '@nestjs/common'
import { InfrastructureDatabaseModule } from '@infrastructure/adapters/database/database.module'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'
import { InfrastructureGeneratorCodeModule } from '@infrastructure/adapters/generator/code/code.module'

@Module({
  imports: [
    InfrastructureDatabaseModule,
    InfrastructureRepositoryModule,
    InfrastructureValidatorModule,
    InfrastructureGeneratorCodeModule,
  ]
})
export class InfrastructureModule {

}