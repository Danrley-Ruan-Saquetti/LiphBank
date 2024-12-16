import { AuthFactory } from '@tests/app/modules/auth/factory'
import { describe, expect, test, vi } from 'vitest'
import { User } from '@app/modules/user/model'

describe('Auth Sign In', () => {

  test('Should be sign in', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER
    }

    const authSignInUseCase = AuthFactory.signInFactory()

    const response = await authSignInUseCase.perform(arrange)

    expect(response.token).toBeTypeOf('string')
  })
})