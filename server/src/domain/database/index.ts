import { PrismaClient } from '@prisma/client'

export abstract class Database extends PrismaClient {

  abstract resolveError(error: any, options?: { debugLogError?: boolean }): never
}