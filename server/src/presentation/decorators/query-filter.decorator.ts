import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type QueryFilterParam = Record<string, Record<string, any>>

export const QueryFilter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return request.query
  },
)