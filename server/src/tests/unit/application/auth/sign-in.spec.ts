import { vi } from 'vitest'
import { JwtModule } from '@nestjs/jwt'
import { InfrastructureJWTModule } from '@infrastructure/adapters/jwt/jwt.module'
import { InfrastructureHashModule } from '@infrastructure/adapters/crypto/crypto.module'
import { AuthSignInUseCase } from '@application/use-cases/auth/user/sign-in.use-case'
import { SignInCredentialInvalidException } from '@application/exceptions/sign-in-credential-invalid.exception'
import { Hash } from '@domain/adapters/crypto/hash'
import { User, UserType } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { UserRepositoryMock } from '@tests/unit/shared/mocks/user/repository.mock'
import { createApplicationMock } from '@tests/unit/shared/mocks/module.mock'

describe('Application - Auth - UseCase - SignIn', () => {
  let hash: Hash
  let authSignInUseCase: AuthSignInUseCase
  let userRepositoryMock: UserRepositoryMock

  beforeEach(async () => {
    userRepositoryMock = new UserRepositoryMock()

    const module = await createApplicationMock({
      imports: [
        JwtModule.register({}),
        InfrastructureHashModule,
        InfrastructureJWTModule
      ],
      providers: [
        AuthSignInUseCase,
        {
          provide: UserRepository,
          useValue: userRepositoryMock
        }
      ]
    })

    authSignInUseCase = module.get(AuthSignInUseCase)
    hash = module.get(Hash)
  })

  test('Should be a sign-in', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: UserType.CLIENT,
    }

    vi.spyOn(userRepositoryMock, 'findByLoginAndType').mockImplementation(async (login: string, type: UserType) => User.load({
      id: 1,
      login,
      type,
      code: 'USR-CODE_TEST',
      password: await hash.hash('Dan!@#123')
    }))

    const response = await authSignInUseCase.perform(arrange)

    expect(response.payload.sub).toEqual(1)
    expect(response.payload.code).toEqual('USR-CODE_TEST')
    expect(typeof response.token).toEqual('string')
  })

  test('Should dispatch an exception when login not registered', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'Dan!@#123',
      type: UserType.CLIENT,
    }

    await expect(authSignInUseCase.perform(arrange)).rejects.toThrow(SignInCredentialInvalidException)
  })

  test('Should dispatch an exception when invalid password', async () => {
    const arrange = {
      login: 'dan@gmail.com',
      password: 'password_invalid',
      type: UserType.CLIENT,
    }

    vi.spyOn(userRepositoryMock, 'findByLoginAndType').mockImplementation(async (login: string, type: UserType) => User.load({
      id: 1,
      login,
      type,
      code: 'USR-CODE_TEST',
      password: await hash.hash('Dan!@#123')
    }))

    await expect(authSignInUseCase.perform(arrange)).rejects.toThrow(SignInCredentialInvalidException)
  })
})