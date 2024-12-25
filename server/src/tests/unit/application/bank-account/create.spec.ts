import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'
import { BankAccount } from '@domain/entities/bank-account.entity'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'
import { BankAccountRepositoryMock } from '@tests/unit/shared/mocks/bank-account/repository.mock'

describe('Application - BankAccount - UseCase - Create', () => {
  let bankAccountCreateUseCase: BankAccountCreateUseCase
  let bankAccountRepositoryMock: BankAccountRepositoryMock
  let peopleRepositoryMock: PeopleRepositoryMock

  beforeEach(async () => {
    bankAccountRepositoryMock = new BankAccountRepositoryMock()
    peopleRepositoryMock = new PeopleRepositoryMock()

    const module = await createApplicationMock({
      providers: [
        BankAccountCreateUseCase,
        {
          provide: BankAccountRepository,
          useValue: bankAccountRepositoryMock
        }
      ]
    })

    bankAccountCreateUseCase = module.get(BankAccountCreateUseCase)
  })

  test('Should be a create bank account', async () => {
    const arrange = {
      peopleId: 1,
      name: 'Bank Account Test',
      slug: 'bank_account_test',
    }

    const response = await bankAccountCreateUseCase.perform(arrange)

    expect(response.bankAccount).toBeInstanceOf(BankAccount)
  })
})