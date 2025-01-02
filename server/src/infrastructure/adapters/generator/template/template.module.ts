import { Module } from '@nestjs/common'
import { TemplateGeneratorServiceImplementation } from '@infrastructure/adapters/generator/template/template.service'
import { TemplateGeneratorService } from '@domain/adapters/generator/template/template.service'

@Module({
  providers: [
    {
      provide: TemplateGeneratorService,
      useClass: TemplateGeneratorServiceImplementation
    }
  ],
  exports: [
    {
      provide: TemplateGeneratorService,
      useClass: TemplateGeneratorServiceImplementation
    }
  ]
})
export class InfrastructureGeneratorTemplateModule { }