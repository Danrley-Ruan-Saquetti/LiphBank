import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { CodeGenerationFailedException } from '@application/exceptions/code-generation-failed.exception'
import { BankAccountGenerateCodeDTO, bankAccountGenerateCodeSchema } from '@application/dto/bank-account/generate-code.dto'
import { CodeGenerator } from '@domain/adapters/generator/code/code.service'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'

@Injectable()
export class BankAccountGenerateCodeUseCase extends UseCase {

  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly codeGenerator: CodeGenerator
  ) {
    super()

    this.codeGenerator.setLength(11)
    this.codeGenerator.setPrefix('BAK-')
  }

  async perform(args: BankAccountGenerateCodeDTO = {}) {
    const { attempts } = this.validator.validate(bankAccountGenerateCodeSchema, args)

    const code = await this.generateCode(attempts)

    return { code }
  }

  private async generateCode(attempts: number) {
    for (let i = 0; i < attempts; i++) {
      const code = this.codeGenerator.generate()

      const bankAccountWithSameCode = await this.bankAccountRepository.findByCode(code)

      if (!bankAccountWithSameCode) {
        return code
      }
    }

    throw new CodeGenerationFailedException('bank account')
  }
}