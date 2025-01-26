import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { financialTransactionCreateSchema, FinancialTransactionCreateDTO } from '@application/dto/financial-transaction/create.dto'
import { FinancialTransaction } from '@domain/entities/financial-transaction.entity'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'
import { DefineInitialSituationFinancialTransactionValueObject } from '@domain/value-objects/define-initial-situation-financial-transaction.value-object'

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
      senderRecipient,
      timesToRepeat,
      title,
      type,
      typeOccurrence,
      value,
      dateTimeCompetence,
      frequency
    } = this.validator.validate(financialTransactionCreateSchema, args)

    const situation = new DefineInitialSituationFinancialTransactionValueObject({ expiresIn }).getSituation()

    const financialTransaction = new FinancialTransaction({
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
        timesToRepeat,
        typeOccurrence,
        countRepeatedOccurrences: 0,
      }
    })

    const financialTransactionCreated = await this.financialTransactionRepository.create(financialTransaction)

    return { financialTransaction: financialTransactionCreated }
  }
}