type GlobalFilterOperators = {
  fil?: boolean
}

export type NumberFilterOperators = number | GlobalFilterOperators & {
  eq?: number
  dif?: number
  in?: number[]
  nin?: number[]
  gt?: number
  gte?: number
  lt?: number
  lte?: number
}

export type StringFilterOperators = string | GlobalFilterOperators & {
  eq?: string
  dif?: string
  in?: string[]
  nin?: string[]
  sw?: string
  ew?: string
}

export type BooleanFilterOperators = boolean | GlobalFilterOperators & {
  eq?: boolean
  dif?: boolean
}

export type DateFilterOperators = Date | GlobalFilterOperators & {
  eq?: Date
  dif?: Date
  gt?: Date
  gte?: Date
  lt?: Date
  lte?: Date
  bet?: [Date, Date]
  nbet?: [Date, Date]
}

export type JSONFilterOperators = object | GlobalFilterOperators & {
  eq?: object
  dif?: object
  contains?: Record<string, unknown>
  matches?: object
  exists?: boolean
};