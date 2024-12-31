import { PrismaClient } from '@prisma/client'
import { FilterSchema } from '@domain/database/filters'

export type SchemaFilterQuery<T = Record<string, any>> = {
  [x in keyof T]: 'string' | 'number' | 'boolean' | 'date' | 'json' | 'enum'
}

export abstract class Database extends PrismaClient {

  abstract resolveError(error: any, options?: { debugLogError?: boolean }): never
  abstract pipeWhere<Schema extends FilterSchema<any>>(whereConditions: Schema): Record<string, Record<string, any>>
  abstract setSchemaFilter<T = any>(schema: SchemaFilterQuery<T>): void
}