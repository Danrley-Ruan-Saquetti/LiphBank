import { z } from 'zod'
import { UseCase } from '../../../../common/use-case'
import { UserRepository } from '../repository'
import { User } from '../model'
import { CodeGenerator } from '../../../../util/generators/code'
import { ValidationException } from '../../../../adapters/validator/validation.exception'

const userGenerateCodeSchema = z.object({
  timeRepeatOnConflict: z
    .number()
    .int()
    .min(1, { message: 'Time to repetition must be a greater 1' })
    .default(1)
})

export type UserGenerateCodeUseCaseArgs = z.input<typeof userGenerateCodeSchema>

export type ListenerHandlerConflict = (user: User) => Promise<{ skip?: boolean } | void>

export class UserGenerateCodeUseCase extends UseCase {

  private codeGenerator = new CodeGenerator({
    length: 8,
    prefix: 'USR#'
  })

  constructor(
    private readonly userRepository: UserRepository
  ) {
    super()
  }

  async perform(args: UserGenerateCodeUseCaseArgs) {
    const { timeRepeatOnConflict = 1 } = this.validator.validate(userGenerateCodeSchema, args)

    let code = ''

    for (let i = 0; i < timeRepeatOnConflict; i++) {
      code = this.codeGenerator.generate()

      const userWithCode = await this.userRepository.findByCode(code)

      if (!userWithCode) break

      if (i != timeRepeatOnConflict - 1) continue

      throw new ValidationException('Unable to generate user code', [
        {
          message: 'User code generation attempts exceeded. Try again later',
          path: ['code', '_time_repeat_exceeded']
        }
      ])
    }

    return { code }
  }
}