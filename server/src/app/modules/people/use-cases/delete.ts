import { Injectable } from '@nestjs/common'
import { UseCase } from '@common/use-case'
import { PeopleRepository } from '@app/modules/people/repository'
import { PeopleFindUseCase, PeopleFindUseCaseProps } from '@app/modules/people/use-cases/find'

export type PeopleDeleteUseCaseProps = PeopleFindUseCaseProps

@Injectable()
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