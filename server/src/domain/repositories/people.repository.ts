import { People } from '@domain/entities/people.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'

export type PeopleFilter = FilterSchema<People>
export type PeopleQueryArgs = QuerySchema<People>

export abstract class PeopleRepository {

  abstract create(people: People): Promise<People>
  abstract update(id: number, people: People): Promise<People>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<People | null>
  abstract findMany(args?: PeopleQueryArgs): Promise<People[]>
  abstract findByCpfCnpj(cpfCnpj: string): Promise<People | null>
}