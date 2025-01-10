import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { FinancialTransactionFindUseCase } from '@application/use-cases/financial-transaction/find.use-case'
import { FinancialTransactionConcludeEvent } from '@application/observer/events/financial-transaction/conclude.event'
import { FinancialTransactionConcludeDTO, financialTransactionConcludeSchema } from '@application/dto/financial-transaction/conclude.dto'
import { FinancialTransactionSituation } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionConcludeUseCase extends UseCase<FinancialTransactionConcludeEvent> {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository,
    private readonly financialTransactionFindUseCase: FinancialTransactionFindUseCase
  ) {
    super()
  }

  async perform(args: FinancialTransactionConcludeDTO) {
    const { bankAccountId, id } = this.validator.validate(financialTransactionConcludeSchema, args)

    const { financialTransaction } = await this.financialTransactionFindUseCase.perform({ id, bankAccountId })

    financialTransaction.situation = FinancialTransactionSituation.CANCELED

    const financialTransactionUpdated = await this.financialTransactionRepository.update(financialTransaction.id, financialTransaction)

    await this.observer.notify('events.financial-transaction.conclude', { financialTransaction })

    return { financialTransaction: financialTransactionUpdated }
  }
}