import { Test } from '@nestjs/testing'
import { describe, expect, test, vi } from 'vitest'
import { createMockUserRepository } from '@tests/app/modules/user/unit/base-components'
import { UserRepository } from '@app/modules/user/repository'
import { AuthAuthorizationUseCase } from '@app/modules/auth/use-cases/authorization'
import { JwtModule } from '@nestjs/jwt'
import { getToken } from '../base-components'
import { ValidationException } from '../../../../../../adapters/validator/validation.exception'

describe('Auth Sign In', () => {
  let authAuthorizationUseCase: AuthAuthorizationUseCase

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
        AuthAuthorizationUseCase,
      ],
    }).compile()

    authAuthorizationUseCase = moduleRef.get(AuthAuthorizationUseCase)
  })

  test('Should be authorized', async () => {
    const token = await getToken(
      { sub: 1, code: 'USR-CODE#TESTE' },
      { secret: 'SECRET-KEY', expires: '1d' }
    )

    const arrange = {
      token: `Bearer ${token}`
    }

    const response = await authAuthorizationUseCase.perform(arrange)

    expect(response?.payload.sub).equal(1)
    expect(response?.payload.code).equal('USR-CODE#TESTE')
  })

  test('Token invalid', async () => {
    const token = 'auishdbiuabs.asi9hduibuasdh8uasibdaod.sdai89hdsibad89ahubsidhnua'

    const arrange = {
      token: `Bearer ${token}`
    }

    await expect(async () => {
      try {
        await authAuthorizationUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('token', '_invalid').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })

  test('Token format invalid', async () => {
    const token = await getToken(
      { sub: 1, code: 'USR-CODE#TESTE' },
      { secret: 'SECRET-KEY', expires: '1d' }
    )
    const arrange = {
      token: `Bearer format-invalid ${token}`
    }

    await expect(async () => {
      try {
        await authAuthorizationUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('authorization', '_format', '_invalid').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })

  test('Bearer invalid', async () => {
    const token = await getToken(
      { sub: 1, code: 'USR-CODE#TESTE' },
      { secret: 'SECRET-KEY', expires: '1d' }
    )
    const arrange = {
      token: `Bearerrr ${token}`
    }

    await expect(async () => {
      try {
        await authAuthorizationUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('bearer', '_invalid').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })

  test('Authorization not defined', async () => {
    const arrange = {
      token: '   '
    }

    await expect(async () => {
      try {
        await authAuthorizationUseCase.perform(arrange)
      } catch (error: any) {
        if (error instanceof ValidationException) {
          expect(error.getCausesByPath('authorization', 'required').length).equal(1)
        }

        throw error
      }
    }).rejects.toThrow(ValidationException)
  })
})