import { Module } from '@nestjs/common'
import { CodeGeneratorServiceImplementation } from '@infrastructure/adapters/generator/code/code.service'
import { CodeGeneratorService } from '@domain/adapters/generator/code/code.service'

@Module({
  providers: [
    {
      provide: CodeGeneratorService,
      useClass: CodeGeneratorServiceImplementation
    }
  ],
  exports: [
    {
      provide: CodeGeneratorService,
      useClass: CodeGeneratorServiceImplementation
    }
  ]
})
export class InfrastructureGeneratorCodeModule { }