import { Test } from '@nestjs/testing'
import { InfrastructureValidatorModule } from '@infrastructure/adapters/validator/validator.module'
import { ZodValidatorAdapterImplementation } from '@infrastructure/adapters/validator/zod.validator'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { Validator } from '@domain/adapters/validator'
import { PeopleRepository } from '@domain/repositories/people.repository'
import { PeopleRepositoryMock } from '@tests/shared/mocks/people/repository.mock'

describe('Application - People - UseCase - Create', () => {
  let peopleCreateUseCase: PeopleCreateUseCase
  let peopleRepository: PeopleRepositoryMock

  beforeAll(async () => {
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
          useClass: PeopleRepositoryMock,
        },
      ],
    }).compile()

    peopleCreateUseCase = module.get(PeopleCreateUseCase)
    peopleRepository = module.get(PeopleRepository)
  })

  test('Should be create a people', async () => {
    const arrange = {
      name: 'Dan Ruan',
      cpfCnpj: '102.547.109-13',
    }

    const response = await peopleCreateUseCase.perform(arrange)

    expect(response.ok).toEqual(true)
  })
})