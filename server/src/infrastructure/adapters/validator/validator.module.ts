import { Global, Module } from '@nestjs/common'
import { ZodValidatorServiceImplementation } from '@infrastructure/adapters/validator/zod.validator.service'
import { ValidatorService } from '@domain/adapters/validator/validator.service'

@Module({
  providers: [
    {
      provide: ValidatorService,
      useClass: ZodValidatorServiceImplementation
    },
  ],
  exports: [
    {
      provide: ValidatorService,
      useClass: ZodValidatorServiceImplementation
    },
  ]
})
export class InfrastructureValidatorModule { }