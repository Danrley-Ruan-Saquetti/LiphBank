import { z } from 'zod'
import { ZodValidatorAdapter } from '../../../../adapters/validator'
import { validateCnpj, validateItin } from '../../../../helpers/itin-cnpj'

export class People {
  id: number
  name: string
  itinCnpj: string
  genre: string
  type: string
  dateOfBirth: Date
}

const userCreateSchema = z.object({
  name: z
    .string({ 'required_error': 'Name is required' })
    .trim()
    .min(1),
  itinCnpj: z
    .string()
    .trim()
    .default('PE'),
  genre: z
    .string()
    .trim(),
  type: z
    .string()
    .trim(),
  dateOfBirth: z
    .coerce
    .date(),
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
    people.genre = dto.genre
    people.dateOfBirth = dto.dateOfBirth
    people.type = dto.type

    return {
      user: people
    }
  }
}