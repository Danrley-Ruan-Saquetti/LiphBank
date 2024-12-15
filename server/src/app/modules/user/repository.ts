import { User, UserType } from '@app/modules/user/model'

export abstract class UserRepository {

  abstract create(user: User): Promise<User>
  abstract findById(id: number): Promise<User | null>
  abstract findByCode(code: string): Promise<User | null>
  abstract findByPeopleIdAndType(peopleId: number, type: UserType): Promise<User | null>
  abstract findByLoginAndType(login: string, type: UserType): Promise<User | null>
}