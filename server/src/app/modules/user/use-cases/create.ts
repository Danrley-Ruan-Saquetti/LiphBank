import { z } from 'zod'
import { User, UserType } from '../model'
import { UseCase } from '../../../../common/use-case'
import { PeopleFindUseCase } from '../../people/use-cases/find'

export const userCreateSchema = z.object({
  peopleId: z
    .coerce
    .number()
    .int(),
  login: z
    .string()
    .trim(),
  password: z
    .string()
    .trim(),
  type: z
    .nativeEnum(UserType, { errorMap: () => ({ message: 'Type invalid' }) }),
})

export type UserCreateUseCaseArgs = z.input<typeof userCreateSchema>

export class UserCreateUseCase extends UseCase {

  constructor(
    private readonly peopleFindUseCase: PeopleFindUseCase
  ) {
    super()
  }

  async perform(args: UserCreateUseCaseArgs) {
    const { peopleId, login, password, type } = this.validator.validate(userCreateSchema, args)

    const { people } = await this.peopleFindUseCase.perform({ id: peopleId })

    const user = User.load({
      id: 1,
      peopleId,
      login,
      password,
      type
    })

    return {
      user: user,
      people: people,
    }
  }
}