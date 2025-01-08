import { QuerySchema } from '@domain/adapters/database/operations'
import { PeopleProps } from '@domain/entities/people.entity'
import { FilterSchema } from '@domain/adapters/database/filters'
import { User, UserProps, UserType } from '@domain/entities/user.entity'

interface UserFilterArgs extends Omit<UserProps, 'settings'> {
  settings: 'json'
  people: PeopleProps
}

export type UserFilter = FilterSchema<UserFilterArgs>
export type UserQueryArgs = QuerySchema<UserFilterArgs>

export abstract class UserRepository {

  abstract create(user: User): Promise<User>
  abstract update(id: number, user: User): Promise<User>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<User | null>
  abstract findByCode(code: string): Promise<User | null>
  abstract findByPeopleIdAndType(peopleId: number, type: UserType): Promise<User | null>
  abstract findByLoginAndType(login: string, type: UserType): Promise<User | null>
  abstract findMany(args?: UserQueryArgs): Promise<User[]>
}