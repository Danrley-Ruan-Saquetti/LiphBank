import { CodeGenerator, CodeGeneratorOptions } from '@domain/adapters/generator/code/code.generator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CodeGeneratorImplementation extends CodeGenerator {

  private options: CodeGeneratorOptions

  constructor(options: Partial<CodeGeneratorOptions> = {}) {
    super()

    this.options = {
      prefix: options?.prefix || '',
      suffix: options?.suffix || '',
      length: options?.length || 8,
      charset: options?.charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    }
  }

  generate(): string {
    const randomPart = Array.from({ length: this.options.length }, () =>
      this.options.charset.charAt(Math.floor(Math.random() * this.options.charset.length))
    ).join('')

    return `${this.options.prefix}${randomPart}${this.options.suffix}`
  }

  setPrefix(prefix: string) {
    this.options.prefix = prefix
  }

  setSuffix(suffix: string) {
    this.options.suffix = suffix
  }

  setLength(length: number) {
    this.options.length = length
  }

  setCharset(charset: string) {
    this.options.charset = charset
  }
}