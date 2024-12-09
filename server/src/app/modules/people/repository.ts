import { People } from './model'

export abstract class PeopleRepository {

  abstract create(people: People): Promise<People>
  abstract update(id: number, people: People): Promise<People>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<People | null>
  abstract findByCpfCnpj(cpfCnpj: string): Promise<People | null>
}