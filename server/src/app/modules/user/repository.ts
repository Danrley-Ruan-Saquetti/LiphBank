import { User, UserType } from './model'

export abstract class UserRepository {

  abstract create(user: User): Promise<User>
  abstract findByPeopleIdAndType(peopleId: number, type: UserType): Promise<User | null>
  abstract findByLoginAndType(login: string, type: UserType): Promise<User | null>
}