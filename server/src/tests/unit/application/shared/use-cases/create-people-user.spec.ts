import { vi } from 'vitest'
import { Test } from '@nestjs/testing'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { UserGenerateCodeUseCase } from '@application/use-cases/user/generate-code.use-case'
import { CreatePeopleAndUserUseCase } from '@application/use-cases/shared/create-people-user.use-case'
import { InfrastructureHashModule } from '@infrastructure/adapters/crypto/crypto.module'
import { CodeGeneratorImplementation } from '@infrastructure/adapters/generator/code/code.generator'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { People } from '@domain/entities/people.entity'
import { User, UserType } from '@domain/entities/user.entity'
import { CodeGenerator } from '@domain/adapters/generator/code/code.generator'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { DatabaseTransaction } from '@domain/database/transaction'
import { UserRepositoryMock } from '@tests/unit/shared/mocks/user/repository.mock'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'

describe('Application - Shared - UseCase - Create People and User', () => {
  let createPeopleAndUserUseCase: CreatePeopleAndUserUseCase
  let peopleRepository: PeopleRepositoryMock
  let userRepository: UserRepositoryMock
  let codeGenerator: CodeGeneratorImplementation

  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    peopleRepository = new PeopleRepositoryMock()
    codeGenerator = new CodeGeneratorImplementation()

    const module = await createApplicationMock({
      imports: [
        InfrastructureValidatorModule,
        InfrastructureHashModule,
      ],
      providers: [
        UserGenerateCodeUseCase,
        UserCreateUseCase,
        PeopleCreateUseCase,
        CreatePeopleAndUserUseCase,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: PeopleRepository,
          useValue: peopleRepository,
        },
        {
          provide: CodeGenerator,
          useValue: codeGenerator,
        },
        {
          provide: DatabaseTransaction,
          useFactory: () => ({ transaction: async (handler: () => Promise<any | void>) => await handler() })
        }
      ],
    })

    createPeopleAndUserUseCase = module.get(CreatePeopleAndUserUseCase)
  })

  test('Should be a create people with People and User', async () => {
    const arrange = {
      people: {
        name: 'Dan Ruan',
        cpfCnpj: '102.547.109-13',
      },
      user: {
        login: 'dan@gmail.com',
        password: 'Dan!@#123',
        type: UserType.CLIENT,
      }
    }

    vi.spyOn(peopleRepository, 'findById').mockImplementation(() => People.load({ id: 1 }))
    vi.spyOn(codeGenerator, 'generate').mockImplementation(() => 'USR-CODE_MOCK')

    const response = await createPeopleAndUserUseCase.perform(arrange)

    expect(response.user).toBeInstanceOf(User)
    expect(response.user.id).toEqual(1)
    expect(response.user.code).toEqual('USR-CODE_MOCK')
    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).toEqual(1)
    expect(response.people.cpfCnpj).toEqual('10254710913')
  })
})