import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { UserRule } from '@app/modules/user/rule'
import { User, UserType } from '@app/modules/user/model'
import { UserRepository } from '@app/modules/user/repository'
import { PeopleFindUseCase } from '@app/modules/people/use-cases/find'
import { ValidationException } from '@adapters/validator/validation.exception'
import { UserGenerateCodeUseCase } from '@app/modules/user/use-cases/generate-code'

const userCreateSchema = z.object({
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

@Injectable()
export class UserCreateUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly peopleFindUseCase: PeopleFindUseCase,
    private readonly userGenerateCodeUseCase: UserGenerateCodeUseCase
  ) {
    super()
  }

  async perform(args: UserCreateUseCaseArgs) {
    const { peopleId, login, password, type } = this.validator.validate(userCreateSchema, args, { debugLogError: true })

    const { people } = await this.peopleFindUseCase.perform({ id: peopleId })

    const isHasUserForPeopleIdAndType = !!(await this.userRepository.findByPeopleIdAndType(people.id, type))

    if (isHasUserForPeopleIdAndType) {
      throw new ValidationException('Create User', [
        {
          message: `There is already a user registration for this person's type "${type == UserType.CUSTOMER ? 'Customer' : 'Administrador'}"`,
          path: ['peopleId', 'type', '_already_exists']
        }
      ])
    }

    const isHasUserForLoginAndType = !!(await this.userRepository.findByLoginAndType(login, type))

    if (isHasUserForLoginAndType) {
      throw new ValidationException('Create User', [
        {
          message: `There is already a user registration for this person's type "${type == UserType.CUSTOMER ? 'Customer' : 'Administrador'}"`,
          path: ['login', 'type', '_already_exists']
        }
      ])
    }

    const { code } = await this.userGenerateCodeUseCase.perform({ timeRepeatOnConflict: 3 })

    const user = User.load({
      peopleId,
      login,
      password,
      type,
      code,
      active: true,
    })

    const userCreated = await this.userRepository.create(user)

    return {
      user: userCreated,
      people: people,
    }
  }
}