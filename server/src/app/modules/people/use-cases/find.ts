import { z } from 'zod'
import { ValidationException } from '../../../../adapters/validator/validation.exception'
import { PeopleRepository } from '../repository'
import { UseCase } from '../../../../common/use-case'

const peopleFindSchema = z.object({
  id: z
    .coerce
    .number()
    .int(),
})

export type PeopleFindUseCaseProps = z.input<typeof peopleFindSchema>

export class PeopleFindUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) {
    super()
  }

  async perform(args: PeopleFindUseCaseProps) {
    const dto = this.validator.validate(peopleFindSchema, args)

    const people = await this.peopleRepository.findById(dto.id)

    if (!people) {
      throw new ValidationException('Find people', [{ message: 'People not found', path: ['id', 'not_found'] }])
    }

    return { people }
  }
}