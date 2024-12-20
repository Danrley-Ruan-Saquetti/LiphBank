import { Module } from '@nestjs/common'
import { ZodValidatorAdapterImplementation } from '@infrastructure/adapters/validator/zod.validator'
import { Validator } from '@domain/adapters/validator'

@Module({
  providers: [
    {
      provide: Validator,
      useClass: ZodValidatorAdapterImplementation
    },
    ZodValidatorAdapterImplementation,
  ],
  exports: [
    ZodValidatorAdapterImplementation
  ]
})
export class InfrastructureValidatorModule { }