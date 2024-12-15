import { Injectable } from '@nestjs/common'
import { UserRepository } from '@app/modules/user/repository'
import { User, UserType } from '@app/modules/user/model'

@Injectable()
export class UserPrismaRepository extends UserRepository {
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
  findById(id: number): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  findByCode(code: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  findByPeopleIdAndType(peopleId: number, type: UserType): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  findByLoginAndType(login: string, type: UserType): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
}