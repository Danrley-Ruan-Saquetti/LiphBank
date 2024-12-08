import { z } from 'zod'
import { People, PeopleGender } from '../model'
import { PeopleRule } from '../rule'
import { ValidationException } from '../../../../adapters/validator/validation.exception'
import { PeopleRepository } from '../repository'
import { UseCase } from '../../../../common/use-case'

const userUpdateSchema = z.object({
  id: z
    .coerce
    .number()
    .int(),
  name: z
    .string({ 'required_error': PeopleRule.validation.name.required })
    .trim()
    .min(PeopleRule.rule.name.min, { message: PeopleRule.validation.name.rangeCharacters })
    .max(PeopleRule.rule.name.max, { message: PeopleRule.validation.name.rangeCharacters }),
  gender: z
    .nativeEnum(PeopleGender, { errorMap: () => ({ message: PeopleRule.validation.gender.valueInvalid }) })
    .nullish(),
  dateOfBirth: z
    .coerce
    .date()
    .nullish()
    .refine(value => !value || value.getTime() < new Date(Date.now()).getTime()),
})

export type PeopleUpdateUseCaseProps = z.input<typeof userUpdateSchema>

export class PeopleUpdateUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) {
    super()
  }

  async perform(args: PeopleUpdateUseCaseProps) {
    const dto = this.validator.validate(userUpdateSchema, args)

    return {
    }
  }
}