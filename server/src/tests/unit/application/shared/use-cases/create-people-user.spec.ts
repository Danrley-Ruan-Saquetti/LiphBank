import { beforeEach, describe, expect, test, vi } from 'vitest'
import { InfrastructureHashModule } from '@infrastructure/adapters/crypto/crypto.module'
import { CodeGeneratorServiceImplementation } from '@infrastructure/adapters/generator/code/code.service'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { UserGenerateCodeUseCase } from '@application/use-cases/user/generate-code.use-case'
import { CreatePeopleAndUserUseCase } from '@application/use-cases/shared/create-people-user.use-case'
import { User, UserType } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { People, PeopleType } from '@domain/entities/people.entity'
import { CodeGeneratorService } from '@domain/adapters/generator/code/code.service'
import { UserRepositoryMock } from '@tests/unit/shared/mocks/user/repository.mock'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'

describe('Application - Shared - UseCase - Create People and User', () => {
  let createPeopleAndUserUseCase: CreatePeopleAndUserUseCase
  let peopleRepository: PeopleRepositoryMock
  let userRepository: UserRepositoryMock
  let codeGenerator: CodeGeneratorServiceImplementation

  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    peopleRepository = new PeopleRepositoryMock()
    codeGenerator = new CodeGeneratorServiceImplementation()

    const module = await createApplicationMock({
      imports: [
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
          provide: CodeGeneratorService,
          useValue: codeGenerator,
        },
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

    vi.spyOn(peopleRepository, 'findById').mockImplementation(() => new People({
      id: 1,
      cpfCnpj: '10254710913',
      name: 'Danrley',
      type: PeopleType.NATURAL_PERSON,
    }))
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