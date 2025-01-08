import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { FinancialTransactionUpdateDelayedDTO, financialTransactionUpdateDelayedSchema } from '@application/dto/financial-transaction/update-delayed.dto'
import { FinancialTransactionSituation } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionUpdateDelayedUseCase extends UseCase {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionUpdateDelayedDTO) {
    const { limit } = this.validator.validate(financialTransactionUpdateDelayedSchema, args)

    const financialTransactions = await this.getFinancialTransactionsDelayed(limit)

    await this.financialTransactionRepository.updateMany({
      where: { id: { in: financialTransactions.map(({ id }) => id) } },
      data: { situation: FinancialTransactionSituation.LATE }
    })
  }

  private async getFinancialTransactionsDelayed(limit?: number) {
    return await this.financialTransactionRepository.findMany({
      where: {
        expiresIn: {
          not: null as any,
          gt: new Date(Date.now())
        }
      },
      orderBy: { id: 'asc' },
      take: limit
    })
  }
}