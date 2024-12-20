import { NestFactory } from '@nestjs/core'
import { MainModule } from '@main.module'
import { env } from '@shared/env'

async function bootstrap() {
  const app = await NestFactory.create(MainModule)
  await app.listen(env('PORT'))
}
bootstrap()