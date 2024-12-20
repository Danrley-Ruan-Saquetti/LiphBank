import { FilterSchema } from '@domain/database/filters/filter.schema'
import { OrderBySchema } from '@domain/database/filters/filter.order-by'

export type QuerySchema<Schema extends object> = {
  where?: FilterSchema<Schema>
  orderBy?: OrderBySchema<Schema>
  take?: number
  skip?: number
}