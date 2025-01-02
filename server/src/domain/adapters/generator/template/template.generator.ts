export type TemplateGeneratorOptions = {}

export abstract class TemplateGenerator {

  abstract generate(template: string, variables?: Record<string, any>, options?: TemplateGeneratorOptions): string
}