import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { UseCase } from '@application/use-cases/use-case'
import { AuthSignInDTO, authSignInSchema } from '@application/dto/auth/sign-in.dto'
import { SignInCredentialInvalidException } from '@application/exceptions/sign-in-credential-invalid.exception'
import { JWT } from '@domain/adapters/jwt'
import { Hash } from '@domain/adapters/crypto/hash'
import { UserRepository } from '@domain/repositories/user.repository'
import { env } from '@shared/env'
import { SendEmailNotificationJob } from '@application/jobs/email-notification/send-email-notification.job'

@Injectable()
export class AuthSignInUseCase extends UseCase {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: Hash,
    private readonly jwt: JWT,
    @InjectQueue('queue.email-notification') private readonly sendEmailNotificationQueue: Queue
  ) {
    super()
  }

  async perform(args: AuthSignInDTO) {
    const { login, type, password } = this.validator.validate(authSignInSchema, args)

    const user = await this.userRepository.findByLoginAndType(login, type)

    if (!user) {
      throw new SignInCredentialInvalidException()
    }

    const isSamePassword = await this.hash.compare(password, user.password)

    if (!isSamePassword) {
      throw new SignInCredentialInvalidException()
    }

    user.lastAccess = new Date(Date.now())

    await this.userRepository.update(user.id, user)

    await this.sendEmailNotificationQueue.add(SendEmailNotificationJob.KEY_JOB, new SendEmailNotificationJob(user).getData())

    const payload = {
      sub: user.id,
      peopleId: user.peopleId,
      code: user.code,
    }

    const token = this.jwt.encode(payload, {
      secret: env('JWT_SECRET'),
      exp: env('JWT_EXPIRATION'),
    })

    return { token, payload }
  }
}