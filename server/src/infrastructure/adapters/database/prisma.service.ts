import { Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseServerException } from '@infrastructure/adapters/database/exceptions/server.exception'
import { DatabaseClientException } from '@infrastructure/adapters/database/exceptions/client.exception'
import { PRISMA_CLIENT_ERRORS_CODE } from '@infrastructure/adapters/database/errors.code'
import { Database } from '@domain/database'

@Injectable()
export class PrismaDatabaseService extends Database implements OnModuleInit {

  constructor() {
    super({ log: ['error', 'warn'] })
  }

  async onModuleInit() {
    await this.$connect()
  }

  resolveError(error: any, options?: { debugLogError?: boolean }): never {
    if (options?.debugLogError) {
      console.log({ message: error?.message || 'Error', ...error })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseClientException(PRISMA_CLIENT_ERRORS_CODE[error.code] || '')
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new DatabaseClientException('Validation error: Check your query')
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new DatabaseServerException('An unknown error occurred in the database')
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
      throw new DatabaseServerException('A severe error occurred in the Prisma engine')
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      throw new DatabaseServerException('Failed to initialize Prisma Client')
    }

    throw new DatabaseServerException('Operation database failed')
  }

  pipeWhere(whereConditions: Record<string, Record<string, any>>) {
    const filters: Record<string, any> = {}

    for (const key in whereConditions) {
      const value = whereConditions[key]

      if (value instanceof Array || value instanceof Date || typeof value != 'object') {
        filters[key] = value
      } else if (typeof value == 'object') {
        filters[key] = this.transformOperators(value)
      }
    }

    return filters
  }

  private transformOperators(operators: Record<string, any>) {
    const operatorsMap: Record<string, any> = {}

    const KEYS_OPERATOR_MAP = {
      'eq': 'equals',
      'nin': 'notIn',
      'sw': 'startsWith',
      'ew': 'endsWith',
    }

    for (const key in operators) {
      const keyMap = KEYS_OPERATOR_MAP[key] || key

      if (keyMap == 'dif') {
        operatorsMap['not'] = {
          equals: operators[key]
        }
      } else {
        operatorsMap[keyMap] = operators[key]
      }
    }

    return operatorsMap
  }
}

/*
{
  name: { eq: 'Dan', dif: 'Dan' },
  active: { eq: true, dif: true },
  balance: { lt: 10 },
  peopleId: 1
}
*/