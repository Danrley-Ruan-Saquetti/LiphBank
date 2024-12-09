import { z } from 'zod'
import { ValidationException } from '../../../../adapters/validator/validation.exception'
import { PeopleRepository } from '../repository'
import { UseCase } from '../../../../common/use-case'

const peopleDeleteSchema = z.object({
  id: z
    .coerce
    .number()
    .int(),
})

export type PeopleDeleteUseCaseProps = z.input<typeof peopleDeleteSchema>

export class PeopleDeleteUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) {
    super()
  }

  async perform(args: PeopleDeleteUseCaseProps) {
    const dto = this.validator.validate(peopleDeleteSchema, args)

    const people = await this.peopleRepository.findById(dto.id)

    if (!people) {
      throw new ValidationException('Delete people', [{ message: 'People not found', path: ['id', 'not_found'] }])
    }

    await this.peopleRepository.update(dto.id, people)
  }
}