import {
  BooleanFilterOperators,
  DateFilterOperators,
  JSONFilterOperators,
  NumberFilterOperators,
  StringFilterOperators
} from '@domain/database/filters/filter.operators'

type GlobalFilter<Schema extends object> = {
  NOT?: FilterSchema<Schema>
  OR?: FilterSchema<Schema>[]
}

export type FilterSchema<Schema extends object> = GlobalFilter<Schema> & {
  [x in keyof Schema]?:
  Schema[x] extends number
  ? NumberFilterOperators
  : Schema[x] extends string
  ? StringFilterOperators
  : Schema[x] extends boolean
  ? BooleanFilterOperators
  : Schema[x] extends Date
  ? DateFilterOperators
  : Schema[x] extends Record<string, unknown>
  ? JSONFilterOperators
  : Schema[x] extends object
  ? FilterSchema<Schema[x]>
  : Schema[x]
}