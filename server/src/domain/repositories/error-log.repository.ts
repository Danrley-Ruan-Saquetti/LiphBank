import { ErrorLog, ErrorLogProps } from '@domain/entities/error-log.entity'
import { FilterSchema, QuerySchema } from '@domain/database/filters'

type ErrorLogFiltersArgs = ErrorLogProps

export type ErrorLogFilter = FilterSchema<ErrorLogFiltersArgs>
export type ErrorLogQueryArgs = QuerySchema<ErrorLogFiltersArgs>

export abstract class ErrorLogRepository {

  abstract create(errorLog: ErrorLog): Promise<ErrorLog>
  abstract update(id: string, errorLog: ErrorLog): Promise<ErrorLog>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<ErrorLog | null>
  abstract findMany(args?: ErrorLogQueryArgs): Promise<ErrorLog[]>
}