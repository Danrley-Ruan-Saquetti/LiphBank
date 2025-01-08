import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { FinancialTransactionDeleteEvent } from '@application/observer/events/financial-transaction/delete.event'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'
import { FinancialTransactionDeleteDTO, financialTransactionDeleteSchema } from '@application/dto/financial-transaction/delete.dto'

@Injectable()
export class FinancialTransactionDeleteUseCase extends UseCase<FinancialTransactionDeleteEvent> {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionDeleteDTO) {
    const { bankAccountId, financialTransactionId } = this.validator.validate(financialTransactionDeleteSchema, args)

    const financialTransaction = await this.getFinancialTransaction(financialTransactionId, bankAccountId)

    await this.financialTransactionRepository.delete(financialTransaction.id)

    await this.observer.notify('events.financial-transaction.deleted', { financialTransaction })
  }

  private async getFinancialTransaction(id: number, bankAccountId: number) {
    const financialTransaction = await this.financialTransactionRepository.findById(id)

    if (!financialTransaction) {
      throw new NotFoundException('Financial Transaction', `${id}`)
    }

    if (financialTransaction.bankAccountId != bankAccountId) {
      throw new UnauthorizedException('You do not have permission to access this financial transaction')
    }

    return financialTransaction
  }
}