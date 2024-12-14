import { z } from 'zod'
import { UseCase } from '../../../../common/use-case'
import { UserRepository } from '../repository'
import { User } from '../model'
import { CodeGenerator } from '../../../../util/generators/code'

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
    private readonly userRepository: UserRepository,
    private listenerConflict: ListenerHandlerConflict | null = null
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

      if (!this.listenerConflict) continue

      const response = await this.listenerConflict(userWithCode)

      if (response?.skip) break
    }

    return { code }
  }
}