import { describe, expect, test } from 'vitest'
import { UserGenerateCodeUseCase } from '../../../../../app/modules/user/use-cases/generate-code'
import { createMockUserRepository } from './base-components'

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
})