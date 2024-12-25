import { vi } from 'vitest'
import { Test } from '@nestjs/testing'
import { InfrastructureHashModule } from '@infrastructure/adapters/crypto/crypto.module'
import { CodeGeneratorImplementation } from '@infrastructure/adapters/generator/code/code.generator'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { ConflictException } from '@application/exceptions/conflict.exception'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { UserGenerateCodeUseCase } from '@application/use-cases/user/generate-code.use-case'
import { People } from '@domain/entities/people.entity'
import { CodeGenerator } from '@domain/adapters/generator/code/code.generator'
import { UserRepository } from '@domain/repositories/user.repository'
import { User, UserType } from '@domain/entities/user.entity'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { UserRepositoryMock } from '@tests/unit/shared/mocks/user/repository.mock'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'

describe('Application - User - UseCase - Create', () => {
  let userCreateUseCase: UserCreateUseCase
  let peopleRepository: PeopleRepositoryMock
  let userRepository: UserRepositoryMock
  let codeGenerator: CodeGeneratorImplementation

  beforeEach(async () => {
    userRepository = new UserRepositoryMock()
    peopleRepository = new PeopleRepositoryMock()
    codeGenerator = new CodeGeneratorImplementation()

    const module = await Test.createTestingModule({
      imports: [
        InfrastructureValidatorModule,
        InfrastructureHashModule,
      ],
      providers: [
        UserGenerateCodeUseCase,
        UserCreateUseCase,
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
      ],
    }).compile()

    userCreateUseCase = module.get(UserCreateUseCase)
  })

  test('Should be create a user', async () => {
    const arrange = {
      peopleId: 1,
      login: 'dan@gmail.com',
      password: 'Dan!@#133',
      type: UserType.CLIENT,
    }

    vi.spyOn(peopleRepository, 'findById').mockImplementation(() => People.load({ id: 1 }))

    const response = await userCreateUseCase.perform(arrange)

    expect(response.user).toBeInstanceOf(User)
    expect(response.people).toBeInstanceOf(People)
    expect(response.user.id).toEqual(1)
    expect(response.user.peopleId).toEqual(1)
    expect(response.user.login).toEqual('dan@gmail.com')
    expect(response.user.type).toEqual(UserType.CLIENT)
    expect(response.people.id).toEqual(1)
  })

  test('Should dispatch an exception when Login and Type already exists', async () => {
    const arrange = {
      peopleId: 1,
      login: 'dan@gmail.com',
      password: 'Dan!@#133',
      type: UserType.CLIENT,
    }

    vi.spyOn(peopleRepository, 'findById').mockImplementation(() => People.load({ id: 1 }))
    vi.spyOn(userRepository, 'findByPeopleIdAndType').mockImplementation(() => User.load({ id: 2, peopleId: 1, type: UserType.CLIENT }))

    await expect(async () => {
      try {
        await userCreateUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ConflictException) {
          expect(error.details?.conflict?.every(path => ['type', 'peopleId'].includes(path))).toEqual(true)
        }

        throw error
      }
    }).rejects.toThrow(ConflictException)
  })

  test('Should dispatch an exception when inform ID People not exists', async () => {
    const arrange = {
      peopleId: 1,
      login: 'dan@gmail.com',
      password: 'Dan!@#133',
      type: UserType.CLIENT,
    }

    await expect(userCreateUseCase.perform(arrange)).rejects.toThrow(NotFoundException)
  })
})