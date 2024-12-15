import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { UseCase } from '../../../../common/use-case'
import { UserRepository } from '../../user/repository'
import { User } from '../../user/model'

const authSignInSchema = z.object({
  login: z
    .string()
    .trim(),
  password: z
    .string(),
  type: z
    .nativeEnum(User.Type)
})

export type AuthSignInUseCaseArgs = z.input<typeof authSignInSchema>

@Injectable()
export class AuthSignInUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) {
    super()
  }

  async perform(args: AuthSignInUseCaseArgs) {
    const { login, password, type } = this.validator.validate(authSignInSchema, args)

    const user = await this.userRepository.findByLoginAndType(login, type)

    return {
      token: ''
    }
  }
}