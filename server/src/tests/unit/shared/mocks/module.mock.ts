import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'

export const createApplicationMock = async ({ controllers = [], exports = [], imports = [], providers = [] }: ModuleMetadata = {}) => await Test.createTestingModule({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    InfrastructureValidatorModule,
    ...imports
  ],
  controllers,
  providers,
  exports,
}).compile()