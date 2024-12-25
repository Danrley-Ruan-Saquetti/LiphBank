import { UseCase } from '@application/use-cases/use-case'
import { UserCreateUseCase } from '@application/use-cases/user/create.use-case'
import { PeopleCreateUseCase } from '@application/use-cases/people/create.use-case'
import { CreatePeopleAndUserDTO } from '@application/dto/shared/create-people-user.dto'
import { DatabaseTransaction } from '@domain/database/transaction'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreatePeopleAndUserUseCase extends UseCase {

  constructor(
    private readonly createPeopleUseCase: PeopleCreateUseCase,
    private readonly createUserUseCase: UserCreateUseCase,
    private readonly databaseTransaction: DatabaseTransaction
  ) {
    super()
  }

  async perform(args: CreatePeopleAndUserDTO) {
    const response = await this.databaseTransaction.transaction(async () => {
      const { people } = await this.createPeopleUseCase.perform({ ...args.people })
      const { user } = await this.createUserUseCase.perform({ ...args.user, peopleId: people.id })

      return { user, people }
    })

    return response
  }
}