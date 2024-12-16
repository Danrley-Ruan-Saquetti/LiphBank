import { PeopleUpdateUseCase } from '@app/modules/people/use-cases/update'
import { PeopleFindUseCase } from '@app/modules/people/use-cases/find'
import { PeopleRepository } from '@app/modules/people/repository'
import { PeopleDeleteUseCase } from '@app/modules/people/use-cases/delete'
import { PeopleCreateUseCase } from '@app/modules/people/use-cases/create'
import { createMockPeopleRepository } from '@tests/app/modules/people/unit/base-components'

export class PeopleFactory {

  static createFactory({
    peopleRepository = createMockPeopleRepository()
  }: {
    peopleRepository?: PeopleRepository
  } = {}) {
    return new PeopleCreateUseCase(peopleRepository)
  }

  static updateFactory({
    peopleRepository = createMockPeopleRepository()
  }: {
    peopleRepository?: PeopleRepository
  } = {}) {
    return new PeopleUpdateUseCase(peopleRepository, PeopleFactory.findFactory({ peopleRepository }))
  }

  static deleteFactory({
    peopleRepository = createMockPeopleRepository()
  }: {
    peopleRepository?: PeopleRepository
  } = {}) {
    return new PeopleDeleteUseCase(peopleRepository, PeopleFactory.findFactory({ peopleRepository }))
  }

  static findFactory({
    peopleRepository = createMockPeopleRepository()
  }: {
    peopleRepository?: PeopleRepository
  } = {}) {
    return new PeopleFindUseCase(peopleRepository)
  }
}