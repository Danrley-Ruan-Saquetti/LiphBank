import { parse as queryStringParser } from 'qs'
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { MainModule } from '@main.module'
import { env } from '@shared/env'
import { NestApplicationOptions } from '@nestjs/common'
// import { CalculateFinancialTransactionFrequencyDate } from './domain/value-objects/calculate-financial-transaction-frequency-date.value-object'
// import { FinancialTransactionFrequency } from './domain/entities/financial-transaction.entity'

async function bootstrap() {
  const options: NestApplicationOptions = { logger: ['error', 'warn', 'fatal'] }
  const adapter: AbstractHttpAdapter = new FastifyAdapter({
    querystringParser: str => queryStringParser(str)
  })

  const app = await NestFactory.create<NestFastifyApplication>(MainModule, adapter, options)

  app.enableCors({
    origin: '*'
  })

  await app.listen(env('PORT'))

  console.log('Server started!')
}
bootstrap()

// const calculate = new CalculateFinancialTransactionFrequencyDate(FinancialTransactionFrequency.DAILY)

// calculate.calculateDates()