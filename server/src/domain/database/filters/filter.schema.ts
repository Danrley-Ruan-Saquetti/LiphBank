import {
  BooleanFilterOperators,
  DateFilterOperators,
  EnumFilterOperators,
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
  NonNullable<Schema[x]> extends number
  ? NumberFilterOperators
  : NonNullable<Schema[x]> extends 'enum'
  ? EnumFilterOperators
  : NonNullable<Schema[x]> extends string
  ? StringFilterOperators
  : NonNullable<Schema[x]> extends boolean
  ? BooleanFilterOperators
  : NonNullable<Schema[x]> extends Date
  ? DateFilterOperators
  : NonNullable<Schema[x]> extends Record<string, unknown>
  ? JSONFilterOperators
  : NonNullable<Schema[x]> extends object
  ? FilterSchema<NonNullable<Schema[x]>>
  : NonNullable<Schema[x]>
}