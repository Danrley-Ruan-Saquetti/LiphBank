import { Test } from '@nestjs/testing'
import { describe, expect, test, vi } from 'vitest'
import bcrypt from 'bcrypt'
import { User } from '@app/modules/user/model'
import { createMockUserRepository } from '@tests/app/modules/user/unit/base-components'
import { AuthSignInUseCase } from '@app/modules/auth/use-cases/sign-in'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '@app/modules/user/repository'

describe('Auth Sign In', () => {
  let authSignInUseCase: AuthSignInUseCase
  let userRepositoryMock: UserRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
      ],
      providers: [
        {
          provide: UserRepository,
          useFactory: () => createMockUserRepository()
        },
        AuthSignInUseCase,
        JwtService,
      ],
    }).compile()

    authSignInUseCase = moduleRef.get(AuthSignInUseCase)
    userRepositoryMock = moduleRef.get(UserRepository)
  })

  test('Should be sign in', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER
    }

    userRepositoryMock.findByLoginAndType = vi.fn().mockImplementation(async (login, type) => User.load({
      id: 1,
      login,
      type,
      code: 'USR-CODE#TESTE',
      password: await bcrypt.hash('Dan!@#123', 10),
    }))

    const response = await authSignInUseCase.perform(arrange)

    expect(response.token).toBeTypeOf('string')
    expect(response.payload.sub).equal(1)
    expect(response.payload.code).equal('USR-CODE#TESTE')
  })
})