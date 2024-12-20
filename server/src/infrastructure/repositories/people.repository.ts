import { PeopleRepository } from '@domain/repositories/people.repository'
import { People } from '../../domain/entities/people.entity'

export class PeopleRepositoryImplementation extends PeopleRepository {

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
  findMany(): Promise<People[]> {
    throw new Error('Method not implemented.')
  }
  findByCpfCnpj(cpfCnpj: string): Promise<People | null> {
    throw new Error('Method not implemented.')
  }
}