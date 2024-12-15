import { describe, expect, test, vi } from 'vitest'
import { User } from '@app/modules/user/model'
import { AuthSignInUseCase } from '@app/modules/auth/use-cases/sign-in'
import { createMockUserRepository } from '@tests/app/modules/user/unit/base-components'

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