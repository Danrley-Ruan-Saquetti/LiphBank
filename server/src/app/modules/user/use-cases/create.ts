import { z } from 'zod'
import { User, UserType } from '../model'
import { UseCase } from '../../../../common/use-case'
import { PeopleFindUseCase } from '../../people/use-cases/find'
import { UserRule } from '../rule'

export const userCreateSchema = z.object({
  peopleId: z
    .coerce
    .number({ 'required_error': UserRule.validation.peopleId.required })
    .int(),
  login: z
    .string({ 'required_error': UserRule.validation.login.required })
    .trim()
    .email({ message: UserRule.validation.login.valueInvalid }),
  password: z
    .string({ 'required_error': UserRule.validation.password.required })
    .trim()
    .regex(UserRule.rule.password.regexp, { message: UserRule.validation.password.valueInvalid }),
  type: z
    .nativeEnum(UserType, { errorMap: () => ({ message: UserRule.validation.type.valueInvalid }) }),
})

export type UserCreateUseCaseArgs = z.input<typeof userCreateSchema>

export class UserCreateUseCase extends UseCase {

  constructor(
    private readonly peopleFindUseCase: PeopleFindUseCase
  ) {
    super()
  }

  async perform(args: UserCreateUseCaseArgs) {
    const { peopleId, login, password, type } = this.validator.validate(userCreateSchema, args, { debugLogError: true })

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