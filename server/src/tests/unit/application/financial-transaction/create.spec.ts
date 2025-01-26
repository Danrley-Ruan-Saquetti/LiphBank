import { beforeEach, describe, expect, test, vi } from 'vitest'
import { CodeGeneratorServiceImplementation } from '@infrastructure/adapters/generator/code/code.service'
import { FinancialTransactionCreateUseCase } from '@application/use-cases/financial-transaction/create.use-case'
import { BankAccount } from '@domain/entities/bank-account.entity'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'
import { FinancialTransactionRepository } from '@domain/repositories/financial-transaction.repository'
import { FinancialTransaction, FinancialTransactionSituation, FinancialTransactionType } from '@domain/entities/financial-transaction.entity'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'
import { BankAccountRepositoryMock } from '@tests/unit/shared/mocks/bank-account/repository.mock'
import { FinancialTransactionRepositoryMock } from '@tests/unit/shared/mocks/financial-transaction/repository.mock'

describe('Application - FinancialTransaction - UseCase - Create', () => {
  let financialTransactionCreateUseCase: FinancialTransactionCreateUseCase
  let financialTransactionRepositoryMock: FinancialTransactionRepositoryMock
  let bankAccountRepositoryMock: BankAccountRepositoryMock
  let codeGenerator: CodeGeneratorServiceImplementation

  beforeEach(async () => {
    financialTransactionRepositoryMock = new FinancialTransactionRepositoryMock()
    bankAccountRepositoryMock = new BankAccountRepositoryMock()
    codeGenerator = new CodeGeneratorServiceImplementation()

    const module = await createApplicationMock({
      providers: [
        FinancialTransactionCreateUseCase,
        {
          provide: FinancialTransactionRepository,
          useValue: financialTransactionRepositoryMock
        },
        {
          provide: BankAccountRepository,
          useValue: bankAccountRepositoryMock
        },
      ]
    })

    financialTransactionCreateUseCase = module.get(FinancialTransactionCreateUseCase)
  })

  test('Should be a create financial transaction', async () => {
    const arrange = {
      bankAccountId: 1,
      title: 'Teste',
      value: 10,
      type: FinancialTransactionType.INCOME,
      senderRecipient: 'John Doe',
    }

    vi.spyOn(bankAccountRepositoryMock, 'findById').mockImplementation(id => new BankAccount({
      id,
      peopleId: 1,
      code: 'BNK-EXAMPLE',
      name: 'Example',
      active: true,
      balance: 100,
    }))

    const response = await financialTransactionCreateUseCase.perform(arrange)

    expect(response.financialTransaction).toBeInstanceOf(FinancialTransaction)
    expect(response.financialTransaction.id).toEqual(1)
    expect(response.financialTransaction.bankAccountId).toEqual(1)
    expect(response.financialTransaction.title).toEqual('Teste')
    expect(response.financialTransaction.value).toEqual(10)
    expect(response.financialTransaction.senderRecipient).toEqual('John Doe')
    expect(response.financialTransaction.description).toEqual('')
    expect(response.financialTransaction.situation).toEqual(FinancialTransactionSituation.PENDING)
  })
})