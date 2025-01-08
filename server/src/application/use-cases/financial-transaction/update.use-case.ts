import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { FinancialTransactionUpdateDTO, financialTransactionUpdateSchema } from '@application/dto/financial-transaction/update.dto'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'
import { NotFoundException } from '../../exceptions/not-found.exception'
import { UnauthorizedException } from '../../exceptions/unauthorized.exception'

@Injectable()
export class FinancialTransactionUpdateUseCase extends UseCase {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionUpdateDTO) {
    const { bankAccountId, financialTransactionId, ...data } = this.validator.validate(financialTransactionUpdateSchema, args)

    const financialTransaction = await this.getFinancialTransaction(financialTransactionId, bankAccountId)

    if (data.dateTimeCompetence) financialTransaction.dateTimeCompetence = data.dateTimeCompetence
    if (data.description) financialTransaction.description = data.description
    if (data.expiresIn) financialTransaction.expiresIn = data.expiresIn
    if (data.frequency) financialTransaction.settings.frequency = data.frequency
    if (typeof data.isObservable != 'undefined') financialTransaction.settings.isObservable = data.isObservable
    if (typeof data.isSendNotification != 'undefined') financialTransaction.settings.isSendNotification = data.isSendNotification
    if (data.senderRecipient) financialTransaction.senderRecipient = data.senderRecipient
    if (data.timesToRepeat) financialTransaction.settings.timesToRepeat = data.timesToRepeat
    if (data.title) financialTransaction.title = data.title
    if (data.typeOccurrence) financialTransaction.settings.typeOccurrence = data.typeOccurrence

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