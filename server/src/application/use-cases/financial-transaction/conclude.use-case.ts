import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { FinancialTransactionConcludeEvent } from '@application/observer/events/financial-transaction/conclude.event'
import { FinancialTransactionConcludeDTO, financialTransactionConcludeSchema } from '@application/dto/financial-transaction/conclude.dto'
import { FinancialTransactionSituation } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionConcludeUseCase extends UseCase<FinancialTransactionConcludeEvent> {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionConcludeDTO) {
    const { bankAccountId, financialTransactionId } = this.validator.validate(financialTransactionConcludeSchema, args)

    const financialTransaction = await this.getFinancialTransaction(financialTransactionId, bankAccountId)

    financialTransaction.situation = FinancialTransactionSituation.CANCELED

    const financialTransactionUpdated = await this.financialTransactionRepository.update(financialTransaction.id, financialTransaction)

    await this.observer.notify('events.financial-transaction.conclude', { financialTransaction })

    return { financialTransaction: financialTransactionUpdated }
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