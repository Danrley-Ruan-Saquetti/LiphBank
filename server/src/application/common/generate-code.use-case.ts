import { Inject } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { CodeGenerationFailedException } from '@application/exceptions/code-generation-failed.exception'
import { GenerateCodeDTO, generateCodeSchema } from '@application/dto/common/generate-code.dto'
import { CodeGeneratorService } from '@domain/adapters/generator/code/code.service'

export class GenerateCodeUseCase extends UseCase {

  @Inject(CodeGeneratorService)
  protected codeGenerator: CodeGeneratorService

  async perform(args: GenerateCodeDTO = {}) {
    const { attempts } = this.validator.validate(generateCodeSchema, args)

    const code = await this.generateCode(attempts)

    return { code }
  }

  private async generateCode(attempts: number) {
    for (let i = 0; i < attempts; i++) {
      const code = this.codeGenerator.generate()

      const isValidCode = await this.validateCode(code)

      if (isValidCode) {
        return code
      }
    }

    throw new CodeGenerationFailedException('user')
  }

  protected async validateCode(code: string) {
    return true
  }

  protected async attemptsExceeded(): Promise<void> { }
}