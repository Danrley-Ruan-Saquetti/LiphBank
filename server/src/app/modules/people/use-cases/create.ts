import { z } from 'zod'

export class People {
  name: string
  itinCnpj: string
  genre: string
  type: string
  dateOfBirth: Date
}

const userCreateSchema = z.object({
  name: z.string({ 'required_error': 'Name is required' }),
  itinCnpj: z.string(),
  genre: z.string(),
  type: z.string(),
  dateOfBirth: z.coerce.date(),
})

export type PeopleCreateUseCaseProps = z.input<typeof userCreateSchema>

export class PeopleCreateUseCase {

  async perform(args: PeopleCreateUseCaseProps) {
    const { dateOfBirth, genre, itinCnpj, name, type } = userCreateSchema.parse(args)

    const people = new People()

    people.name = name
    people.itinCnpj = itinCnpj
    people.genre = genre
    people.dateOfBirth = dateOfBirth
    people.type = type

    return {
      user: people
    }
  }
}