import { Test } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { describe, expect, test, vi } from 'vitest'
import bcrypt from 'bcrypt'
import { ValidationException } from '@adapters/validator/validation.exception'
import { createMockUserRepository } from '@tests/app/modules/user/unit/base-components'
import { User } from '@app/modules/user/model'
import { UserRepository } from '@app/modules/user/repository'
import { AuthSignInUseCase } from '@app/modules/auth/use-cases/sign-in'

describe('Auth Sign In', () => {
  let authSignInUseCase: AuthSignInUseCase
  let userRepositoryMock: UserRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'SECRET-KEY',
          global: true,
          signOptions: { expiresIn: '1d' },
        })
      ],
      providers: [
        {
          provide: UserRepository,
          useFactory: () => createMockUserRepository()
        },
        AuthSignInUseCase,
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

    vi.spyOn(userRepositoryMock, 'findByLoginAndType').mockImplementation(async (login, type) => User.load({
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

  test('User not found', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: User.Type.CUSTOMER
    }

    await expect(async () => {
      try {
        await authSignInUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('login', 'password', '_not_found').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })

  test('Password invalid', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'password_invalid',
      type: User.Type.CUSTOMER
    }

    vi.spyOn(userRepositoryMock, 'findByLoginAndType').mockImplementation(async (login, type) => User.load({
      id: 1,
      login,
      type,
      code: 'USR-CODE#TESTE',
      password: await bcrypt.hash('Dan!@#123', 10),
    }))

    await expect(async () => {
      try {
        await authSignInUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('login', 'password', '_not_found').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})