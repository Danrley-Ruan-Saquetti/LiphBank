
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthAuthorizationUseCase } from '@application/use-cases/auth/authorization.use-case'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authAuthorizationUseCase: AuthAuthorizationUseCase
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization || ''

    await this.authAuthorizationUseCase.perform({ token })

    return true
  }
}
