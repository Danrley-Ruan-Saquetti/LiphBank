import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { FinancialTransactionFindUseCase } from '@application/use-cases/financial-transaction/find.use-case'
import { FinancialTransactionCancelEvent } from '@application/observer/events/financial-transaction/cancel.event'
import { FinancialTransactionCancelDTO, financialTransactionCancelSchema } from '@application/dto/financial-transaction/cancel.dto'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionCancelUseCase extends UseCase<FinancialTransactionCancelEvent> {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository,
    private readonly financialTransactionFindUseCase: FinancialTransactionFindUseCase
  ) {
    super()
  }

  async perform(args: FinancialTransactionCancelDTO) {
    const { bankAccountId, id } = this.validator.validate(financialTransactionCancelSchema, args)

    const { financialTransaction } = await this.financialTransactionFindUseCase.perform({ id, bankAccountId })

    financialTransaction.cancel()

    const financialTransactionUpdated = await this.financialTransactionRepository.update(financialTransaction.id, financialTransaction)

    await this.observer.notify('events.financial-transaction.cancel', { financialTransaction })

    return { financialTransaction: financialTransactionUpdated }
  }
}