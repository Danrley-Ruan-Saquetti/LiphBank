import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { MainModule } from '@main.module'
import { env } from '@shared/env'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(MainModule, new FastifyAdapter(), { logger: ['error', 'warn', 'fatal'] })

  app.enableCors({
    origin: '*'
  })

  await app.listen(env('PORT'))

  console.log('Server started!')
}
bootstrap()