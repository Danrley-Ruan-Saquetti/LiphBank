import { z } from 'zod'
import { ZodValidatorAdapter } from '../../../../adapters/validator'
import { validateCNPJ, validateCPF } from '../../../../helpers/cpf-cnpj'
import { People, PeopleGender, PeopleType } from '../model'
import { extractDigits } from '../../../../util'

const userCreateSchema = z.object({
  name: z
    .string({ 'required_error': 'Name is required' })
    .trim()
    .min(1),
  cpfCnpj: z
    .string()
    .trim()
    .transform(extractDigits),
  gender: z
    .nativeEnum(PeopleGender)
    .optional()
    .nullish(),
  type: z
    .nativeEnum(PeopleType)
    .default(PeopleType.NATURAL_PERSON),
  dateOfBirth: z
    .coerce
    .date()
    .nullish()
    .refine(value => !value || value.getTime() < new Date(Date.now()).getTime()),
})
  .refine(({ type, cpfCnpj }) => {
    if (type == 'NP') {
      return validateCPF(cpfCnpj)
    }

    return type == 'LE' && validateCNPJ(cpfCnpj)
  }, ({ type }) => ({ message: `${type == 'LE' ? 'CNPJ' : 'CPF'} invalid`, path: ['cpfCnpj'] }))

export type PeopleCreateUseCaseProps = z.input<typeof userCreateSchema>

export class PeopleCreateUseCase {

  private validator = new ZodValidatorAdapter()

  async perform(args: PeopleCreateUseCaseProps) {
    const dto = this.validator.validate(userCreateSchema, args)

    const people = new People()

    people.id = 1
    people.name = dto.name
    people.cpfCnpj = dto.cpfCnpj
    people.gender = dto.gender as PeopleGender
    people.dateOfBirth = dto.dateOfBirth
    people.type = dto.type

    return {
      user: people
    }
  }
}