import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { CodeGenerationFailedException } from '@application/exceptions/code-generation-failed.exception'
import { UserGenerateCodeDTO, userGenerateCodeSchema } from '@application/dto/user/generate-code.dto'
import { UserRepository } from '@domain/repositories/user.repository'
import { CodeGeneratorService } from '@domain/adapters/generator/code/code.service'

@Injectable()
export class UserGenerateCodeUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly codeGenerator: CodeGeneratorService
  ) {
    super()

    this.codeGenerator.setLength(11)
    this.codeGenerator.setPrefix('USR-')
  }

  async perform(args: UserGenerateCodeDTO = {}) {
    const { attempts } = this.validator.validate(userGenerateCodeSchema, args)

    const code = await this.generateCode(attempts)

    return { code }
  }

  private async generateCode(attempts: number) {
    for (let i = 0; i < attempts; i++) {
      const code = this.codeGenerator.generate()

      const isCodeAlreadyExists = await this.codeAlreadyExists(code)

      if (!isCodeAlreadyExists) {
        return code
      }
    }

    throw new CodeGenerationFailedException('user')
  }

  private async codeAlreadyExists(code: string) {
    return !(await this.userRepository.findByCode(code))
  }
}