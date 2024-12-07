import { z } from 'zod'
import { ZodValidatorAdapter } from '../../../../adapters/validator'
import { validateCnpj, validateItin } from '../../../../helpers/itin-cnpj'
import { People, PeopleGender, PeopleType } from '../model'
import { extractDigits } from '../../../../util'

const userCreateSchema = z.object({
  name: z
    .string({ 'required_error': 'Name is required' })
    .trim()
    .min(1),
  itinCnpj: z
    .string()
    .trim()
    .transform(extractDigits),
  gender: z
    .nativeEnum(PeopleGender)
    .optional(),
  type: z
    .nativeEnum(PeopleType)
    .default(PeopleType.NATURAL_PERSON),
  dateOfBirth: z
    .coerce
    .date()
    .nullish(),
})
  .refine(({ type, itinCnpj }) => {
    if (type == 'NP') {
      return validateItin(itinCnpj)
    }

    return type == 'LE' && validateCnpj(itinCnpj)
  }, ({ type }) => ({ message: `${type == 'LE' ? 'CNPJ' : 'ITIN'} invalid`, path: ['itinCnpj'] }))

export type PeopleCreateUseCaseProps = z.input<typeof userCreateSchema>

export class PeopleCreateUseCase {

  private validator = new ZodValidatorAdapter()

  async perform(args: PeopleCreateUseCaseProps) {
    const dto = this.validator.validate(userCreateSchema, args)

    const people = new People()

    people.id = 1
    people.name = dto.name
    people.itinCnpj = dto.itinCnpj
    people.gender = dto.gender as PeopleGender
    people.dateOfBirth = dto.dateOfBirth
    people.type = dto.type

    return {
      user: people
    }
  }
}