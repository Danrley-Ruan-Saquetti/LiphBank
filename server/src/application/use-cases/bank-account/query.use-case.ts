import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { bankAccountQuerySchema, BankAccountQueryDTO } from '@application/dto/bank-account/query.dto'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'

@Injectable()
export class BankAccountQueryUseCase extends UseCase {

  constructor(
    private readonly bankAccountRepository: BankAccountRepository
  ) {
    super()
  }

  async perform(args: BankAccountQueryDTO) {
    const { peopleId, page, size, ...filters } = this.validator.validate(bankAccountQuerySchema, args)

    const bankAccounts = await this.bankAccountRepository.findMany({
      where: {
        ...filters,
        peopleId
      },
      take: size,
      skip: size * page
    })

    return { bankAccounts }
  }
}