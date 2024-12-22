import { Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DatabaseServerException } from '@infrastructure/adapters/database/exceptions/server.exception'
import { DatabaseClientException } from '@infrastructure/adapters/database/exceptions/client.exception'
import { PRISMA_CLIENT_ERRORS_CODE } from '@infrastructure/adapters/database/errors.code'
import { Database } from '@domain/database'

@Injectable()
export class PrismaDatabaseService extends Database implements OnModuleInit {

  constructor() {
    super({ log: ['error', 'warn', 'info'] })
  }

  async onModuleInit() {
    await this.$connect()
  }

  resolveError(error: any): never {
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
}