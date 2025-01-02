import { Module } from '@nestjs/common'
import { TemplateGeneratorImplementation } from '@infrastructure/adapters/generator/template/template.generator'
import { TemplateGenerator } from '@domain/adapters/generator/template/template.generator'

@Module({
  providers: [
    {
      provide: TemplateGenerator,
      useClass: TemplateGeneratorImplementation
    }
  ],
  exports: [
    {
      provide: TemplateGenerator,
      useClass: TemplateGeneratorImplementation
    }
  ]
})
export class InfrastructureGeneratorTemplateModule { }