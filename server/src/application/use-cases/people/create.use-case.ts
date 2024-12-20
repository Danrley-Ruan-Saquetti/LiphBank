import { Injectable } from '@nestjs/common'
import { PeopleCreateDTO, peopleCreateSchema } from '@application/dto/people/create.dto'
import { Validator } from '@domain/adapters/validator'
import { PeopleRepository } from '@domain/repositories/people.repository'

@Injectable()
export class PeopleCreateUseCase {

  constructor(
    private readonly validator: Validator,
    private readonly peopleRepository: PeopleRepository
  ) { }

  async perform(args: PeopleCreateDTO) {
    const { } = this.validator.validate(peopleCreateSchema, args)

    return { ok: true }
  }
}