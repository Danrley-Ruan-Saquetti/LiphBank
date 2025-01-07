import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { FinancialTransactionCancelDTO, financialTransactionCancelSchema } from '@application/dto/financial-transaction/cancel.dto'
import { FinancialTransactionSituation } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionCancelUseCase extends UseCase {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionCancelDTO) {
    const { bankAccountId, financialTransactionId } = this.validator.validate(financialTransactionCancelSchema, args)

    const financialTransaction = await this.getFinancialTransaction(financialTransactionId, bankAccountId)

    financialTransaction.situation = FinancialTransactionSituation.CANCELED

    const financialTransactionUpdated = await this.financialTransactionRepository.update(financialTransaction.id, financialTransaction)

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