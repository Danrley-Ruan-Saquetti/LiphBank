import { UserFactory } from '@tests/app/modules/user/factory'
import { describe, expect, test } from 'vitest'

describe('Generate User Code', function () {

  test('Should be a generate user code', async function () {
    const arrange = {
      timeRepeatOnConflict: 1
    }

    const userGenerateCode = UserFactory.generateCodeFactory()

    const response = await userGenerateCode.perform(arrange)

    expect(response.code).toBeTypeOf('string')
    expect(response.code.startsWith('USR#')).equal(true)
    expect(response.code.length).equal(12)
  })
})