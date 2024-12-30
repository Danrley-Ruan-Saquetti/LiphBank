import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { financialTransactionQuerySchema, FinancialTransactionQueryDTO } from '@application/dto/financial-transaction/query.dto'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionQueryUseCase extends UseCase {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionQueryDTO) {
    const { bankAccountId, pageIndex, pageSize, ...filters } = this.validator.validate(financialTransactionQuerySchema, args)

    const financialTransactions = await this.financialTransactionRepository.findMany({
      where: {
        ...filters,
        bankAccountId,
      },
      take: pageSize,
      skip: pageSize * pageIndex
    })

    return { financialTransactions }
  }
}