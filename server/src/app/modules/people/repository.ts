import { People } from './model'

export abstract class PeopleRepository {

  abstract create(people: People): Promise<People>
  abstract findByCpfCnpj(cpfCnpj: string): Promise<People | null>
}