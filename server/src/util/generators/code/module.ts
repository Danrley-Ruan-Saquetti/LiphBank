import { Module } from '@nestjs/common'
import { CodeGenerator } from '.'

@Module({
  providers: [
    CodeGenerator
  ],
  exports: [
    CodeGenerator
  ]
})
export class CodeModule { }