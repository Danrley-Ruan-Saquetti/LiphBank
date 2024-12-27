
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

    const { payload } = await this.authAuthorizationUseCase.perform({ token })

    request.user = {
      id: payload.sub,
      code: payload.code,
      peopleId: payload.peopleId,
    }

    return true
  }
}
