import { Module } from '@nestjs/common'
import { CodeGeneratorImplementation } from '@infrastructure/adapters/generator/code/code.generator'
import { CodeGenerator } from '@domain/adapters/generator/code/code.service'

@Module({
  providers: [
    {
      provide: CodeGenerator,
      useClass: CodeGeneratorImplementation
    }
  ],
  exports: [
    {
      provide: CodeGenerator,
      useClass: CodeGeneratorImplementation
    }
  ]
})
export class InfrastructureGeneratorCodeModule { }