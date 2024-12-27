import { UseCase } from '@application/use-cases/use-case'
import { financialTransactionCreateSchema, FinancialTransactionCreateDTO } from '@application/dto/financial-transaction/create.dto'
import { FinancialTransaction } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FinancialTransactionCreateUseCase extends UseCase {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionCreateDTO) {
    const {
      bankAccountId,
      description,
      expiresIn,
      isObservable,
      isSendNotification,
      senderRecipient,
      situation,
      timesToRepeat,
      title,
      type,
      typeOccurrence,
      value,
      dateTimeCompetence,
      frequency
    } = this.validator.validate(financialTransactionCreateSchema, args)

    const financialTransaction = FinancialTransaction.load({
      bankAccountId,
      description,
      expiresIn,
      dateTimeCompetence,
      situation,
      title,
      type,
      senderRecipient,
      value,
      settings: {
        frequency,
        isObservable,
        isSendNotification,
        timesToRepeat,
        typeOccurrence,
        countRepeatedOccurrences: 0,
      }
    })

    const financialTransactionCreated = await this.financialTransactionRepository.create(financialTransaction)

    return { financialTransaction: financialTransactionCreated }
  }
}