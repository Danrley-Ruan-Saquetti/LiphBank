import Handlebars from 'handlebars'
import { Injectable } from '@nestjs/common'
import { GenerateTemplateException } from '@infrastructure/adapters/generator/template/template.exception'
import { TemplateGenerator, TemplateGeneratorOptions } from '@domain/adapters/generator/template/template.generator'

@Injectable()
export class TemplateGeneratorImplementation extends TemplateGenerator {

  generate(template: string, variables?: Record<string, any>, options?: TemplateGeneratorOptions) {
    try {
      return Handlebars.compile(template)(variables)
    } catch (error: any) {
      throw new GenerateTemplateException(error.message || 'Error')
    }
  }
}