import { describe, expect, test, vi } from 'vitest'
import { AuthSignInUseCase } from '../../../../../../app/modules/auth/use-cases/sign-in'
import { createMockUserRepository } from '../../../user/unit/base-components'
import { User } from '../../../../../../app/modules/user/model'

describe('Auth Sign In', () => {

  test('Should be sign in', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER
    }

    const authSignInUseCase = new AuthSignInUseCase(
      createMockUserRepository()
    )

    const response = await authSignInUseCase.perform(arrange)

    expect(response.token).toBeTypeOf('string')
  })
})