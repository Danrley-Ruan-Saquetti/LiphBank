import { Injectable } from '@nestjs/common'
import { ConflictException } from '@shared/exceptions'
import { UseCase } from '@application/use-cases/use-case'
import { PeopleCreateDTO, peopleCreateSchema } from '@application/dto/people/create.dto'
import { People } from '@domain/entities/people.entity'
import { PeopleRepository } from '@domain/repositories/people.repository'

@Injectable()
export class PeopleCreateUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository
  ) {
    super()
  }

  async perform(args: PeopleCreateDTO) {
    const { cpfCnpj, name, dateOfBirth, gender, type } = this.validator.validate(peopleCreateSchema, args)

    const peopleWithSameCpfCnpj = await this.peopleRepository.findByCpfCnpj(cpfCnpj)

    if (peopleWithSameCpfCnpj) {
      throw new ConflictException('People', cpfCnpj, { conflict: ['cpfCnpj'] })
    }

    const people = People.load({
      name,
      cpfCnpj,
      dateOfBirth,
      gender,
      type,
    })

    const peopleCreated = await this.peopleRepository.create(people)

    return { people: peopleCreated }
  }
}