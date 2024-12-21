import { expect, vi } from 'vitest'
import { Test } from '@nestjs/testing'
import { ConflictException } from '@shared/exceptions/conflict.exception'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { ZodValidatorAdapterImplementation } from '@infrastructure/adapters/validator/zod.validator'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { People } from '@domain/entities/people.entity'
import { Validator } from '@domain/adapters/validator'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { PeopleRepositoryMock } from '@tests/unit/shared/mocks/people/repository.mock'

describe('Application - People - UseCase - Create', () => {
  let peopleCreateUseCase: PeopleCreateUseCase
  let peopleRepository: PeopleRepositoryMock

  beforeAll(async () => {
    peopleRepository = new PeopleRepositoryMock()

    const module = await Test.createTestingModule({
      imports: [
        InfrastructureValidatorModule,
      ],
      providers: [
        PeopleCreateUseCase,
        {
          provide: Validator,
          useClass: ZodValidatorAdapterImplementation,
        },
        {
          provide: PeopleRepository,
          useValue: peopleRepository,
        },
      ],
    }).compile()

    peopleCreateUseCase = module.get(PeopleCreateUseCase)
  })

  test('Should be create a people', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      type: People.Type.NATURAL_PERSON,
    }

    const response = await peopleCreateUseCase.perform(arrange)

    expect(response.people).toBeInstanceOf(People)
    expect(response.people.id).toEqual(1)
    expect(response.people.type).toEqual(People.Type.NATURAL_PERSON)
    expect(response.people.name).toEqual('Dan Ruan')
    expect(response.people.cpfCnpj).toEqual('10254710913')
  })

  test('Should dispatch an exception when CPF/CNPJ already exists', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
      type: People.Type.NATURAL_PERSON,
    }

    vi.spyOn(peopleRepository, 'findByCpfCnpj').mockImplementation(() => People.load({ cpfCnpj: '10254710913' }))

    await expect(async () => {
      try {
        await peopleCreateUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ConflictException) {
          expect(error.details?.value).toEqual('10254710913')
        }

        throw error
      }
    }).rejects.toThrow(ConflictException)
  })
})