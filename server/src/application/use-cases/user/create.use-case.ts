import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { ConflictException } from '@application/exceptions/conflict.exception'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UserGenerateCodeUseCase } from '@application/use-cases/user/generate-code.use-case'
import { UserCreateDTO, userCreateSchema } from '@application/dto/user/create.dto'
import { User } from '@domain/entities/user.entity'
import { Hash } from '@domain/adapters/crypto/hash'
import { People } from '@domain/entities/people.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { PeopleRepository } from '@domain/repositories/people.repository'

@Injectable()
export class UserCreateUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly peopleRepository: PeopleRepository,
    private readonly userGenerateCodeUseCase: UserGenerateCodeUseCase,
    private readonly hash: Hash
  ) {
    super()
  }

  async perform(args: UserCreateDTO) {
    const { login, password, peopleId, type, cpfCnpj } = this.validator.validate(userCreateSchema, args)

    const people = await this.getPeopleByIdOrCpfCnpj({ cpfCnpj, peopleId })

    const userWithSamePeopleAndType = await this.userRepository.findByPeopleIdAndType(people.id, type)

    if (userWithSamePeopleAndType) {
      throw new ConflictException('User', `${people.id}`, { conflict: ['peopleId', 'type'] })
    }

    const userWithSameLoginAndType = await this.userRepository.findByLoginAndType(login, type)

    if (userWithSameLoginAndType) {
      throw new ConflictException('User', login, { conflict: ['login', 'type'] })
    }

    const { code } = await this.userGenerateCodeUseCase.perform()
    const passwordHashed = await this.hash.hash(password)

    const user = User.load({
      login,
      type,
      code,
      password: passwordHashed,
      peopleId: people.id,
      active: true,
    })

    const userCreated = await this.userRepository.create(user)

    return { user: userCreated, people }
  }

  private async getPeopleByIdOrCpfCnpj({ cpfCnpj, peopleId }: { peopleId?: number, cpfCnpj?: string }) {
    let people: People | null = null

    if (peopleId) {
      people = await this.peopleRepository.findById(peopleId)
    }
    else if (cpfCnpj) {
      people = await this.peopleRepository.findByCpfCnpj(cpfCnpj)
    }

    if (!people) {
      throw new NotFoundException('People', `${peopleId}`)
    }

    return people
  }
}