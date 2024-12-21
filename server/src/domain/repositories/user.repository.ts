import { FilterSchema, QuerySchema } from '@domain/database/filters'
import { User } from '@domain/entities/user.entity'

export type UserFilter = FilterSchema<User>
export type UserQueryArgs = QuerySchema<User>

export abstract class UserRepository {

  abstract create(user: User): Promise<User>
  abstract update(id: number, user: User): Promise<User>
  abstract delete(id: number): Promise<void>
  abstract findById(id: number): Promise<User | null>
  abstract findMany(args?: UserQueryArgs): Promise<User[]>
}