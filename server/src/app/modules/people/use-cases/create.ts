import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ValidationException } from '@adapters/validator/validation.exception'
import { extractDigits } from '@util/string'
import { validateCNPJ, validateCPF } from '@util/validators/cpf-cnpj'
import { PeopleRule } from '@app/modules/people/rule'
import { PeopleRepository } from '@app/modules/people/repository'
import { People, PeopleGender, PeopleType } from '@app/modules/people/model'

const peopleCreateSchema = z.object({
  name: z
    .string({ 'required_error': PeopleRule.validation.name.required })
    .trim()
    .min(PeopleRule.rule.name.minCharacters, { message: PeopleRule.validation.name.rangeCharacters })
    .max(PeopleRule.rule.name.maxCharacters, { message: PeopleRule.validation.name.rangeCharacters }),
  type: z
    .nativeEnum(PeopleType, { errorMap: () => ({ message: PeopleRule.validation.type.valueInvalid }) })
    .default(PeopleType.NATURAL_PERSON),
  cpfCnpj: z
    .string({ 'required_error': PeopleRule.validation.name.required })
    .trim()
    .transform(extractDigits),
  gender: z
    .nativeEnum(PeopleGender, { errorMap: () => ({ message: PeopleRule.validation.gender.valueInvalid }) })
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
  .refine(({ type, cpfCnpj }) => {
    if (type == PeopleType.NATURAL_PERSON) {
      return validateCPF(cpfCnpj)
    }

    return type == PeopleType.LEGAL_ENTITY && validateCNPJ(cpfCnpj)
  }, ({ type }) => ({ message: type == PeopleType.LEGAL_ENTITY ? `${PeopleRule.validation.cnpj}` : `${PeopleRule.validation.cpf}`, path: ['cpfCnpj'] }))

export type PeopleCreateUseCaseProps = z.input<typeof peopleCreateSchema>

@Injectable()
export class PeopleCreateUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) {
    super()
  }

  async perform(args: PeopleCreateUseCaseProps) {
    const dto = this.validator.validate(peopleCreateSchema, args)

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
      people: peopleCreated
    }
  }

  private async validatePeopleWithCpfCnpjAlreadyExists(cpfCnpj: string) {
    const people = await this.peopleRepository.findByCpfCnpj(cpfCnpj)

    if (people) {
      throw new ValidationException('Create People', [{ message: 'CPF/CNPJ already exists', path: ['cpfCnpj', '_already_exists'] }])
    }
  }
}