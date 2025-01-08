import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { FinancialTransactionUpdateDTO, financialTransactionUpdateSchema } from '@application/dto/financial-transaction/update.dto'
import { FinancialTransactionRule } from '@domain/rules/financial-transaction.rule'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'
import { DefineInitialSituationFinancialTransactionValueObject } from '@domain/value-objects/define-initial-situation-financial-transaction.value-object'
import { FinancialTransaction, FinancialTransactionFrequency, FinancialTransactionTypeOccurrence } from '@domain/entities/financial-transaction.entity'

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

    this.updateDataFinancialTransaction(financialTransaction, data)

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

  private updateDataFinancialTransaction(
    financialTransaction: FinancialTransaction,
    data: {
      title?: string
      senderRecipient?: string
      description?: string | null
      isObservable?: boolean
      isSendNotification?: boolean
      timesToRepeat?: number | null
      typeOccurrence?: FinancialTransactionTypeOccurrence
      frequency?: FinancialTransactionFrequency | null
      expiresIn?: Date | null
      dateTimeCompetence?: Date
    }
  ) {
    if (data.dateTimeCompetence) financialTransaction.dateTimeCompetence = data.dateTimeCompetence
    if (data.description) financialTransaction.description = data.description
    if (data.frequency) financialTransaction.settings.frequency = data.frequency
    if (typeof data.isObservable != 'undefined') financialTransaction.settings.isObservable = data.isObservable
    if (typeof data.isSendNotification != 'undefined') financialTransaction.settings.isSendNotification = data.isSendNotification
    if (data.senderRecipient) financialTransaction.senderRecipient = data.senderRecipient
    if (data.timesToRepeat) financialTransaction.settings.timesToRepeat = data.timesToRepeat
    if (data.title) financialTransaction.title = data.title
    if (data.typeOccurrence) financialTransaction.settings.typeOccurrence = data.typeOccurrence
    if (data.expiresIn) {
      financialTransaction.expiresIn = data.expiresIn

      if (!FinancialTransactionRule.closedSituations.includes(financialTransaction.situation)) {
        financialTransaction.situation = new DefineInitialSituationFinancialTransactionValueObject({ expiresIn: data.expiresIn }).getSituation()
      }
    }
  }
}