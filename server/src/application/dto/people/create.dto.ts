import { z } from 'zod'
import { extractDigits } from '@shared/utils/string'
import { PeopleMessage } from '@application/messages/people.message'
import { PeopleRule } from '@domain/rules/people.rule'
import { PeopleGender, PeopleType } from '@domain/entities/people.entity'

export const peopleCreateSchema = z.object({
  name: z
    .string({ 'required_error': PeopleMessage.name.required })
    .trim()
    .min(PeopleRule.name.minCharacters, { message: PeopleMessage.name.rangeCharacters })
    .max(PeopleRule.name.maxCharacters, { message: PeopleMessage.name.rangeCharacters }),
  type: z
    .nativeEnum(PeopleType, { errorMap: () => ({ message: PeopleMessage.type.valueInvalid }) }),
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

export type PeopleCreateDTO = z.infer<typeof peopleCreateSchema>