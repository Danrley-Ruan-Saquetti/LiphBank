import { GeneratorCodeException } from './exception'

export class CodeGenerator {
  private prefix: string
  private suffix: string
  private length: number
  private charset: string

  constructor(options?: {
    prefix?: string;
    suffix?: string;
    length?: number;
    charset?: string;
  }) {
    this.prefix = options?.prefix || ''
    this.suffix = options?.suffix || ''
    this.length = options?.length || 8
    this.charset = options?.charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  }

  generate(): string {
    const randomPart = Array.from({ length: this.length }, () =>
      this.charset.charAt(Math.floor(Math.random() * this.charset.length))
    ).join('')

    return `${this.prefix}${randomPart}${this.suffix}`
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix
  }

  setSuffix(suffix: string): void {
    this.suffix = suffix
  }

  setLength(length: number): void {
    if (length <= 0) {
      throw new GeneratorCodeException('O tamanho deve ser maior que zero.')
    }
    this.length = length
  }

  setCharset(charset: string): void {
    if (!charset) {
      throw new GeneratorCodeException('O conjunto de caracteres não pode estar vazio.')
    }
    this.charset = charset
  }
}