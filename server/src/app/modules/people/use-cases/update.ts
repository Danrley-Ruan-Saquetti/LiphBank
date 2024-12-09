import { z } from 'zod'
import { People, PeopleGender } from '../model'
import { PeopleRule } from '../rule'
import { ValidationException } from '../../../../adapters/validator/validation.exception'
import { PeopleRepository } from '../repository'
import { UseCase } from '../../../../common/use-case'

const peopleUpdateSchema = z.object({
  id: z
    .coerce
    .number()
    .int(),
  name: z
    .string()
    .trim()
    .min(PeopleRule.rule.name.min, { message: PeopleRule.validation.name.rangeCharacters })
    .max(PeopleRule.rule.name.max, { message: PeopleRule.validation.name.rangeCharacters })
    .optional(),
  gender: z
    .nativeEnum(PeopleGender, { 'invalid_type_error': PeopleRule.validation.gender.valueInvalid })
    .nullish(),
  dateOfBirth: z
    .coerce
    .date()
    .nullish()
    .refine(
      value => !value || value.getTime() < new Date(Date.now()).getTime(),
      {
        message: PeopleRule.validation.dateGreaterCurrent.dateGreaterThanCurrent,
        path: ['date_greater_current_date']
      },
    ),
})

export type PeopleUpdateUseCaseProps = z.input<typeof peopleUpdateSchema>

export class PeopleUpdateUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) {
    super()
  }

  async perform(args: PeopleUpdateUseCaseProps) {
    const dto = this.validator.validate(peopleUpdateSchema, args)

    const people = await this.peopleRepository.findById(dto.id)

    if (!people) {
      throw new ValidationException('Update people', [{ message: 'People not found', path: ['id', 'notFound'] }])
    }

    if (typeof dto.name != 'undefined') people.name = dto.name
    if (typeof dto.dateOfBirth != 'undefined') people.dateOfBirth = dto.dateOfBirth
    if (typeof dto.gender != 'undefined') people.gender = dto.gender

    const peopleUpdated = await this.peopleRepository.update(dto.id, people)

    return {
      people: peopleUpdated
    }
  }
}