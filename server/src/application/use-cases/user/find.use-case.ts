import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UserFindDTO, userFindSchema } from '@application/dto/user/find.dto'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'

@Injectable()
export class UserFindUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly peopleRepository: PeopleRepository,
  ) {
    super()
  }

  async perform(args: UserFindDTO) {
    const { id } = this.validator.validate(userFindSchema, args)

    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException('User', `${id}`)
    }

    const people = await this.peopleRepository.findById(user.peopleId)

    return { user, people }
  }
}