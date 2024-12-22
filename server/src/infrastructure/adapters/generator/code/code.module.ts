import { Module } from '@nestjs/common'
import { CodeGeneratorImplementation } from '@infrastructure/adapters/generator/code/code.generator'
import { CodeGenerator } from '@domain/adapters/generator/code/code.generator'

@Module({
  providers: [
    CodeGeneratorImplementation,
    {
      provide: CodeGenerator,
      useClass: CodeGeneratorImplementation
    }
  ],
  exports: [
    CodeGeneratorImplementation,
    {
      provide: CodeGenerator,
      useClass: CodeGeneratorImplementation
    }
  ]
})
export class InfrastructureGeneratorCodeModule { }