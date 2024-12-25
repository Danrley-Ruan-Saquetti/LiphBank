import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { BankAccountCreateDTO, bankAccountSchemaCreate } from '@application/dto/bank-account/create.dto'
import { BankAccount } from '@domain/entities/bank-account.entity'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'

@Injectable()
export class BankAccountCreateUseCase extends UseCase {

  constructor(
    private readonly bankAccountRepository: BankAccountRepository
  ) {
    super()
  }

  async perform(args: BankAccountCreateDTO) {
    const { } = this.validator.validate(bankAccountSchemaCreate, args)

    const bankAccount = BankAccount.load({})

    await this.bankAccountRepository.create(bankAccount)

    return { bankAccount }
  }
}