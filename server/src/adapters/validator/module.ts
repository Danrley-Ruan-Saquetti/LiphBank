import { Module } from '@nestjs/common'
import { ZodValidatorAdapter } from '.'

@Module({
  providers: [
    ZodValidatorAdapter
  ]
})
export class ValidatorModule { }