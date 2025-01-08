import { FilterSchema } from '@domain/adapters/database/filters/filter.schema'

export type UpdateSchema<Schema extends object> = {
  where?: FilterSchema<Schema>
  data: Partial<Schema>
}