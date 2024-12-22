import { z } from 'zod'
import { extractDigits } from '@shared/utils/string'
import { PeopleMessage } from '@application/messages/people.message'
import { PeopleRule } from '@domain/rules/people.rule'
import { PeopleGender, PeopleType } from '@domain/entities/people.entity'
import { validateCNPJ, validateCPF } from '../../../shared/validators/cpf-cnpj'

export const peopleCreateSchema = z.object({
  name: z
    .string({ 'required_error': PeopleMessage.name.required })
    .trim()
    .min(PeopleRule.name.minCharacters, { message: PeopleMessage.name.rangeCharacters })
    .max(PeopleRule.name.maxCharacters, { message: PeopleMessage.name.rangeCharacters }),
  type: z
    .nativeEnum(PeopleType, { errorMap: () => ({ message: PeopleMessage.type.valueInvalid }) })
    .default(PeopleType.NATURAL_PERSON),
  cpfCnpj: z
    .string({ 'required_error': PeopleMessage.name.required })
    .trim()
    .transform(extractDigits),
  gender: z
    .nativeEnum(PeopleGender, { errorMap: () => ({ message: PeopleMessage.gender.valueInvalid }) })
    .nullish(),
  dateOfBirth: z
    .coerce
    .date()
    .nullish()
    .refine(
      value => !value || value.getTime() < new Date(Date.now()).getTime(),
      {
        message: PeopleMessage.dateGreaterCurrent.dateGreaterThanCurrent,
        path: ['date_greater_current_date']
      },
    ),
})
  .refine(({ type, cpfCnpj }) => {
    if (type == PeopleType.NATURAL_PERSON) {
      return validateCPF(cpfCnpj)
    }

    return type == PeopleType.LEGAL_ENTITY && validateCNPJ(cpfCnpj)
  }, ({ type }) => ({ message: type == PeopleType.LEGAL_ENTITY ? `${PeopleMessage.cnpj.valueInvalid}` : `${PeopleMessage.cpf.valueInvalid}`, path: ['cpfCnpj'] }))

export type PeopleCreateDTO = z.input<typeof peopleCreateSchema>