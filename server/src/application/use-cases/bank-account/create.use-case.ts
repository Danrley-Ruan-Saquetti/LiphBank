import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { BankAccountCreateDTO, bankAccountSchemaCreate } from '@application/dto/bank-account/create.dto'
import { BankAccount } from '@domain/entities/bank-account.entity'

@Injectable()
export class BankAccountCreateUseCase extends UseCase {

  async perform(args: BankAccountCreateDTO) {
    const { } = this.validator.validate(bankAccountSchemaCreate, args)

    const bankAccount = BankAccount.load({})

    return { bankAccount }
  }
}