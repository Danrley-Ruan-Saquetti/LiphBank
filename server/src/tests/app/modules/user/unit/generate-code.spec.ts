import { describe, expect, test, vi } from 'vitest'
import { UserGenerateCodeUseCase } from '../../../../../app/modules/user/use-cases/generate-code'
import { createMockUserRepository } from './base-components'
import { User } from '../../../../../app/modules/user/model'
import { ValidationException } from '../../../../../adapters/validator/validation.exception'

describe('Generate User Code', function () {

  test('Should be a generate user code', async function () {
    const arrange = {
      timeRepeatOnConflict: 1
    }

    const userGenerateCode = new UserGenerateCodeUseCase(
      createMockUserRepository()
    )

    const response = await userGenerateCode.perform(arrange)

    expect(response.code).toBeTypeOf('string')
    expect(response.code.startsWith('USR#')).equal(true)
    expect(response.code.length).equal(12)
  })

  test('Should throw exception on conflict of User with same code already exists', async function () {
    const arrange = {
      timeRepeatOnConflict: 3
    }

    const userRepositoryMock = createMockUserRepository()

    userRepositoryMock.findByCode = vi.fn().mockImplementation(code => User.load({
      id: 1,
      code
    }))

    let countTimesToConflict = 0

    const userGenerateCode = new UserGenerateCodeUseCase(
      userRepositoryMock,
      async user => {
        countTimesToConflict++

        if (countTimesToConflict == 2) {
          return { skip: true }
        }
      }
    )

    await userGenerateCode.perform(arrange)

    expect(countTimesToConflict).equal(2)
  })
})