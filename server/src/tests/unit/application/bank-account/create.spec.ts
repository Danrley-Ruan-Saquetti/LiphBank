import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'
import { BankAccount } from '@domain/entities/bank-account.entity'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'

describe('Application - BankAccount - UseCase - Create', () => {
  let bankAccountCreateUseCase: BankAccountCreateUseCase
  let peopleRepositoryMock: PeopleRepositoryMock

  beforeEach(async () => {
    peopleRepositoryMock = new PeopleRepositoryMock()

    const module = await createApplicationMock({
      providers: [
        BankAccountCreateUseCase,
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