import { afterAll, beforeAll, describe, test } from 'vitest'
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppAuthModule } from '@app/modules/auth/module'

describe('Cats', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppAuthModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  test('/GET cats', () => {
    return request(app.getHttpServer())
      .get('/auth/sign-in')
  })

  afterAll(async () => {
    await app.close()
  })
})