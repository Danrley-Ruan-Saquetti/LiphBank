import { People } from './model'

export abstract class PeopleRepository {

  abstract findByCpfCnpj(cpfCnpj: string): Promise<People | null>;
}