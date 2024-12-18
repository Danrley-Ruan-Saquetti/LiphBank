import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'

export async function getToken(payload: any, { expires, secret }: { secret: string, expires: string }) {
  const moduleRef = await Test.createTestingModule({
    imports: [
      JwtModule.register({
        secret,
        signOptions: { expiresIn: expires },
      })
    ],
  }).compile()

  const jwtService = moduleRef.get(JwtService)

  return jwtService.sign(payload)
}