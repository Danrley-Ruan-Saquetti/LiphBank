import { DatabaseTransaction } from '../../../../adapters/database/transaction'
import { UseCase } from '../../../../common/use-case'
import { PeopleCreateUseCase, PeopleCreateUseCaseProps } from '../../people/use-cases/create'
import { UserCreateUseCase, UserCreateUseCaseArgs } from '../../user/use-cases/create'

export type CreatePeopleAndUserArgs = {
  user: UserCreateUseCaseArgs
  people: PeopleCreateUseCaseProps
}

export class CreatePeopleAndUser extends UseCase {

  constructor(
    private peopleCreateUseCase: PeopleCreateUseCase,
    private userCreateUseCase: UserCreateUseCase,
    private databaseTransaction: DatabaseTransaction
  ) {
    super()
  }

  async perform(args: CreatePeopleAndUserArgs) {
    const { people, user } = await this.databaseTransaction.transaction(async () => {
      const { people } = await this.peopleCreateUseCase.perform(args.people)

      const { user } = await this.userCreateUseCase.perform({
        ...args.user,
        peopleId: people.id,
      })

      return { people, user }
    })

    return { people, user }
  }
}