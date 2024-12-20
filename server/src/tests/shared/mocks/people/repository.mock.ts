import { People } from '@domain/entities/people.entity'
import { PeopleQueryArgs, PeopleRepository } from '@domain/repositories/people.repository'

export class PeopleRepositoryMock extends PeopleRepository {

  create(people: People): Promise<People> {
    throw new Error('Method not implemented.')
  }
  update(id: number, people: People): Promise<People> {
    throw new Error('Method not implemented.')
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findById(id: number): Promise<People | null> {
    throw new Error('Method not implemented.')
  }
  findMany(args?: PeopleQueryArgs): Promise<People[]> {
    throw new Error('Method not implemented.')
  }
  findByCpfCnpj(cpfCnpj: string): Promise<People | null> {
    throw new Error('Method not implemented.')
  }
}