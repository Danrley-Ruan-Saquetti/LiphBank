type GlobalFilterOperators<Type = any> = {
  equals?: Type
  not?: Type
  // fil?: boolean
}

export type NumberFilterOperators = number | GlobalFilterOperators<number> & {
  in?: number[]
  notIn?: number[]
  gt?: number
  gte?: number
  lt?: number
  lte?: number
}

export type StringFilterOperators = string | GlobalFilterOperators<string> & {
  in?: string[]
  notIn?: string[]
  contains?: string
  notContains?: string
  startsWith?: string
  endsWith?: string
}

export type BooleanFilterOperators = boolean | GlobalFilterOperators<boolean> & {}

export type DateFilterOperators = Date | GlobalFilterOperators<Date> & {
  gt?: Date
  gte?: Date
  lt?: Date
  lte?: Date
  between?: [Date, Date]
  notBetween?: [Date, Date]
}

export type EnumFilterOperators = string | GlobalFilterOperators<string> & {
  in?: string[]
  notIn?: string[]
}

export type JSONFilterOperators = object | GlobalFilterOperators<object> & {
  contains?: Record<string, unknown>
  matches?: object
  exists?: boolean
}