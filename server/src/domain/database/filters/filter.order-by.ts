type OrderArgs = 'asc' | 'desc'

export type OrderBySchema<Schema extends object> = {
  [x in keyof Schema]?:
  Schema[x] extends Date
  ? OrderArgs
  : Schema[x] extends Array<unknown>
  ? OrderArgs
  : Schema[x] extends object
  ? OrderBySchema<Schema[x]>
  : OrderArgs
} | OrderBySchema<Schema>[]