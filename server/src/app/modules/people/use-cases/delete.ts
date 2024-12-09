import { PeopleRepository } from '../repository'
import { UseCase } from '../../../../common/use-case'
import { PeopleFindUseCase, PeopleFindUseCaseProps } from './find'

export type PeopleDeleteUseCaseProps = PeopleFindUseCaseProps

export class PeopleDeleteUseCase extends UseCase {

  constructor(
    private readonly peopleRepository: PeopleRepository,
    private readonly peopleFindUseCase: PeopleFindUseCase
  ) {
    super()
  }

  async perform(args: PeopleDeleteUseCaseProps) {
    const { people } = await this.peopleFindUseCase.perform(args)

    await this.peopleRepository.delete(people.id)
  }
}