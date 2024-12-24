import { Injectable } from '@nestjs/common'
import { NotFoundException, ConflictException } from '@shared/exceptions'
import { UseCase } from '@application/use-cases/use-case'
import { UserGenerateCodeUseCase } from '@application/use-cases/user/generate-code.use-case'
import { UserCreateDTO, userCreateSchema } from '@application/dto/user/create.dto'
import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'

@Injectable()
export class UserCreateUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly peopleRepository: PeopleRepository,
    private readonly userGenerateCodeUseCase: UserGenerateCodeUseCase,
  ) {
    super()
  }

  async perform(args: UserCreateDTO) {
    const { login, password, peopleId, type } = this.validator.validate(userCreateSchema, args)

    const people = await this.peopleRepository.findById(peopleId)

    if (!people) {
      throw new NotFoundException('User', `${peopleId}`)
    }

    const userWithSamePeopleAndType = await this.userRepository.findByPeopleIdAndType(people.id, type)

    if (userWithSamePeopleAndType) {
      throw new ConflictException('User', `${people.id}`, { conflict: ['peopleId', 'type'] })
    }

    const userWithSameLoginAndType = await this.userRepository.findByLoginAndType(login, type)

    if (userWithSameLoginAndType) {
      throw new ConflictException('User', login, { conflict: ['login', 'type'] })
    }

    const { code } = await this.userGenerateCodeUseCase.perform()

    const user = User.load({
      login,
      password,
      type,
      code,
      peopleId: people.id,
      active: true,
    })

    const userCreated = await this.userRepository.create(user)

    return { user: userCreated, people }
  }
}