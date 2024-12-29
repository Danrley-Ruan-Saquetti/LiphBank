import { PrismaClient } from '@prisma/client'
import { FilterSchema } from './filters'

export abstract class Database extends PrismaClient {

  abstract resolveError(error: any, options?: { debugLogError?: boolean }): never
  abstract pipeWhere<Schema extends FilterSchema<any>>(whereConditions: Schema): Record<string, Record<string, any>>
}