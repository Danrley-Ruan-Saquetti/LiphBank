import { Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseServerException } from '@infrastructure/adapters/database/exceptions/server.exception'
import { DatabaseClientException } from '@infrastructure/adapters/database/exceptions/client.exception'
import { PRISMA_CLIENT_ERRORS_CODE } from '@infrastructure/adapters/database/errors.code'
import { Database, SchemaFilterQuery } from '@domain/database'

@Injectable()
export class PrismaDatabaseService extends Database implements OnModuleInit {

  private queryFilterSchema: SchemaFilterQuery = {}

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

    throw new DatabaseServerException('Operation database failed. Error: ' + error.message || '')
  }

  setSchemaFilter<T = any>(schema: SchemaFilterQuery<T>): void {
    this.queryFilterSchema = schema
  }

  pipeWhere(whereConditions: Record<string, Record<string, any>>) {
    return new QueryFilterBuilder(this.queryFilterSchema).build(whereConditions)
  }
}

class QueryFilterBuilder {

  private filters: Record<string, any> = {}

  constructor(
    private readonly queryFilterSchema: SchemaFilterQuery = {}
  ) { }

  build(whereConditions: Record<string, Record<string, any>>) {
    for (const field in whereConditions) {
      const operators = whereConditions[field]

      for (const operator in operators) {
        const value = operators[operator]

        this.parseOperatorField(field, operator, value)
      }
    }

    return this.filters
  }

  private parseOperatorField(field: string, operator: string, value: any) {
    const type = this.queryFilterSchema[field]

    if (!type) return

    const SCHEMA_TYPE: Record<string, Record<string, () => { filters?: any, superFilters?: { BASE?: any, NOT?: any } }>> = {
      string: {
        notContains: () => ({ superFilters: { NOT: { contains: value } } }),
        fil: () => ({}),
      },
      number: {
        fil: () => ({}),
      },
      boolean: {
        fil: () => ({}),
      },
      date: {
        between: () => ({ filters: { lte: value[0], gte: value[1] } }),
        notBetween: () => ({ superFilters: { NOT: { lte: value[0], gte: value[1] } } }),
        fil: () => ({}),
      },
      json: {
        fil: () => ({}),
      },
      enum: {
        fil: () => ({}),
      }
    }

    const schemaType = SCHEMA_TYPE[type]

    if (!schemaType) return

    const schemaOperator = schemaType[operator] || (() => ({
      filters: { [operator]: value }
    }))

    const { filters, superFilters } = schemaOperator()

    this.addFilter(field, { filters, superFilters })
  }

  private addFilter(field: string, { filters, superFilters }: { filters?: any, superFilters?: { NOT?: any, BASE?: any } }) {
    if (filters) {
      this.filters[field] = { ...this.filters[field], ...filters }
    }

    if (superFilters) {
      if (superFilters.NOT) {
        this.filters.NOT = {
          ...this.filters?.NOT,
          [field]: {
            ...this.filters?.NOT?.[field],
            ...superFilters.NOT,
          }
        }
      }

      if (superFilters.BASE) {
        this.filters = {
          ...this.filters,
          ...superFilters.BASE,
          AND: [...(this.filters.AND ?? []), ...(superFilters.BASE.AND ?? [])],
          OR: [...(this.filters.OR ?? []), ...(superFilters.BASE.OR ?? [])],
        }
      }
    }
  }
}