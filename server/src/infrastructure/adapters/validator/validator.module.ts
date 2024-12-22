import { Global, Module } from '@nestjs/common'
import { ZodValidatorAdapterImplementation } from '@infrastructure/adapters/validator/zod.validator'
import { Validator } from '@domain/adapters/validator'

@Module({
  providers: [
    ZodValidatorAdapterImplementation,
    {
      provide: Validator,
      useClass: ZodValidatorAdapterImplementation
    },
  ],
  exports: [
    ZodValidatorAdapterImplementation,
    {
      provide: Validator,
      useClass: ZodValidatorAdapterImplementation
    },
  ]
})
export class InfrastructureValidatorModule { }