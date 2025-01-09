import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { FinancialTransactionFindDTO, financialTransactionFindSchema } from '@application/dto/financial-transaction/find.dto'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'

@Injectable()
export class FinancialTransactionFindUseCase extends UseCase {

  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository
  ) {
    super()
  }

  async perform(args: FinancialTransactionFindDTO) {
    const { bankAccountId, financialTransactionId } = this.validator.validate(financialTransactionFindSchema, args)

    const financialTransaction = await this.financialTransactionRepository.findById(financialTransactionId)

    if (!financialTransaction) {
      throw new NotFoundException('Financial Transaction', `${financialTransactionId}`)
    }

    if (financialTransaction.bankAccountId != bankAccountId) {
      throw new UnauthorizedException('You do not have permission to access this financial transaction')
    }

    return { financialTransaction }
  }
}