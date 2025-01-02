import { CodeGeneratorImplementation } from '@infrastructure/adapters/generator/code/code.generator'
import { BankAccountCreateUseCase } from '@application/use-cases/bank-account/create.use-case'
import { BankAccountGenerateCodeUseCase } from '@application/use-cases/bank-account/generate-code.use-case'
import { BankAccount } from '@domain/entities/bank-account.entity'
import { CodeGenerator } from '@domain/adapters/generator/code/code.service'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'
import { BankAccountRepositoryMock } from '@tests/unit/shared/mocks/bank-account/repository.mock'

describe('Application - BankAccount - UseCase - Create', () => {
  let bankAccountCreateUseCase: BankAccountCreateUseCase
  let bankAccountRepositoryMock: BankAccountRepositoryMock
  let peopleRepositoryMock: PeopleRepositoryMock
  let codeGenerator: CodeGeneratorImplementation

  beforeEach(async () => {
    bankAccountRepositoryMock = new BankAccountRepositoryMock()
    peopleRepositoryMock = new PeopleRepositoryMock()
    codeGenerator = new CodeGeneratorImplementation()

    const module = await createApplicationMock({
      providers: [
        BankAccountCreateUseCase,
        BankAccountGenerateCodeUseCase,
        {
          provide: BankAccountRepository,
          useValue: bankAccountRepositoryMock
        },
        {
          provide: CodeGenerator,
          useValue: codeGenerator,
        }
      ]
    })

    bankAccountCreateUseCase = module.get(BankAccountCreateUseCase)
  })

  test('Should be a create bank account', async () => {
    const arrange = {
      peopleId: 1,
      name: 'Bank Account Test',
    }

    const response = await bankAccountCreateUseCase.perform(arrange)

    expect(response.bankAccount).toBeInstanceOf(BankAccount)
  })
})