import { z } from 'zod'
import { People, PeopleGender, PeopleType } from '../model'
import { PeopleRule } from '../rule'
import { ValidationException } from '../../../../adapters/validator/validation.exception'
import { PeopleRepository } from '../repository'
import { UseCase } from '../../../../common/use-case'
import { validateCNPJ, validateCPF } from '../../../../util/validators/cpf-cnpj'
import { extractDigits } from '../../../../util/string'

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

export class PeopleCreateUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) {
    super()
  }

  async perform(args: PeopleCreateUseCaseProps) {
    const dto = this.validator.validate(userCreateSchema, args)

    await this.validatePeopleWithCpfCnpjAlreadyExists(dto.cpfCnpj)

    const people = People.load({
      name: dto.name,
      cpfCnpj: dto.cpfCnpj,
      gender: dto.gender as PeopleGender,
      dateOfBirth: dto.dateOfBirth,
      type: dto.type,
    })

    const peopleCreated = await this.peopleRepository.create(people)

    return {
      user: peopleCreated
    }
  }

  private async validatePeopleWithCpfCnpjAlreadyExists(cpfCnpj: string) {
    const people = await this.peopleRepository.findByCpfCnpj(cpfCnpj)

    if (people) {
      throw new ValidationException('Create People', [{ message: 'CPF/CNPJ already exists', path: ['cpfCnpj', 'alreadyExists'] }])
    }
  }
}