import { Injectable } from '@nestjs/common'
import { UseCase } from '@application/use-cases/use-case'
import { NotFoundException } from '@application/exceptions/not-found.exception'
import { UnauthorizedException } from '@application/exceptions/unauthorized.exception'
import { BankAccountJWTPayload } from '@application/types/bank-account-jwt-payload.type'
import { AuthBankAccountSignInDTO, authBankAccountSignInSchema } from '@application/dto/auth/bank-account/sign-in.dto'
import { JWTService } from '@domain/adapters/jwt/jwt.service'
import { BankAccountRepository } from '@domain/repositories/bank-account.repository'
import { env } from '@shared/env'

@Injectable()
export class AuthBankAccountSignInUseCase extends UseCase {

  constructor(
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly jwt: JWTService,
  ) {
    super()
  }

  async perform(args: AuthBankAccountSignInDTO) {
    const { peopleId, code } = this.validator.validate(authBankAccountSignInSchema, args)

    const bankAccount = await this.bankAccountRepository.findByCode(code)

    if (!bankAccount) {
      throw new NotFoundException('Bank Account', code)
    }

    if (bankAccount.peopleId != peopleId) {
      throw new UnauthorizedException('You do not have permission to access this bank account')
    }

    if (!bankAccount.active) {
      throw new UnauthorizedException('This currently inactive bank account')
    }

    const payload: BankAccountJWTPayload = {
      sub: bankAccount.id,
      code: bankAccount.code,
    }

    const token = this.jwt.encode(payload, {
      exp: env('JWT_BANK_ACCOUNT_EXPIRATION'),
      secret: env('JWT_BANK_ACCOUNT_SECRET'),
    })

    return { token, payload }
  }
}