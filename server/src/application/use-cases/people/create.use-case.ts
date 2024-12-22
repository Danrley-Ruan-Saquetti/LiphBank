import { Injectable } from '@nestjs/common'
import { ConflictException } from '@shared/exceptions'
import { PeopleCreateDTO, peopleCreateSchema } from '@application/dto/people/create.dto'
import { People } from '@domain/entities/people.entity'
import { Validator } from '@domain/adapters/validator'
import { PeopleRepository } from '@domain/repositories/people.repository'

@Injectable()
export class PeopleCreateUseCase {

  constructor(
    private readonly validator: Validator,
    private readonly peopleRepository: PeopleRepository
  ) { }

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