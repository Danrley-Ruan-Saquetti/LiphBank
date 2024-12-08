import { z } from 'zod'
import { ZodValidatorAdapter } from '../../../../adapters/validator'
import { validateCNPJ, validateCPF } from '../../../../helpers/cpf-cnpj'
import { People, PeopleGender, PeopleType } from '../model'
import { extractDigits } from '../../../../util'
import { PeopleRule } from '../rule'
import { ValidationException } from '../../../../adapters/validator/validation.exception'
import { PeopleRepository } from '../repository'

const userCreateSchema = z.object({
  name: z
    .string({ 'required_error': PeopleRule.validation.name.required })
    .trim()
    .min(PeopleRule.rule.name.min, { message: PeopleRule.validation.name.rangeCharacters })
    .max(PeopleRule.rule.name.max, { message: PeopleRule.validation.name.rangeCharacters }),
  cpfCnpj: z
    .string({ message: PeopleRule.validation.name.required })
    .trim()
    .transform(extractDigits),
  gender: z
    .nativeEnum(PeopleGender, { errorMap: () => ({ message: PeopleRule.validation.gender.valueInvalid }) })
    .nullish(),
  type: z
    .nativeEnum(PeopleType, { errorMap: () => ({ message: PeopleRule.validation.type.valueInvalid }) })
    .default(PeopleType.NATURAL_PERSON),
  dateOfBirth: z
    .coerce
    .date()
    .nullish()
    .refine(value => !value || value.getTime() < new Date(Date.now()).getTime()),
})
  .refine(({ type, cpfCnpj }) => {
    if (type == PeopleType.NATURAL_PERSON) {
      return validateCPF(cpfCnpj)
    }

    return type == PeopleType.LEGAL_ENTITY && validateCNPJ(cpfCnpj)
  }, ({ type }) => ({ message: type == PeopleType.LEGAL_ENTITY ? `${PeopleRule.validation.cnpj}` : `${PeopleRule.validation.cpf}`, path: ['cpfCnpj'] }))

export type PeopleCreateUseCaseProps = z.input<typeof userCreateSchema>

export class PeopleCreateUseCase {

  private readonly validator = new ZodValidatorAdapter()

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) { }

  async perform(args: PeopleCreateUseCaseProps) {
    const dto = this.validator.validate(userCreateSchema, args)

    await this.validatePeopleWithCpfCnpjAlreadyExists(dto.cpfCnpj)

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

  private async validatePeopleWithCpfCnpjAlreadyExists(cpfCnpj: string) {
    const people = await this.peopleRepository.findByCpfCnpj(cpfCnpj)

    if (people) {
      throw new ValidationException('Create People', [{ message: 'CPF/CNPJ already exists', path: ['cpfCnpj', 'already_exists'] }])
    }
  }
}