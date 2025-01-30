import { Injectable, Scope } from '@nestjs/common'
import pLimit from 'p-limit'
import { ConcurrencyParallelismHandler, ConcurrencyService, ConcurrencyParallelismOptions } from '@domain/adapters/concurrency/concurrency.service'

@Injectable({ scope: Scope.REQUEST })
export class ConcurrencyServiceImplementation extends ConcurrencyService {

  async parallelism<T = void>(handlers: ConcurrencyParallelismHandler<T>[], { concurrences = 1 }: ConcurrencyParallelismOptions = {}) {
    const limit = pLimit(concurrences)

    const limiteHandlers = handlers.map((handler) => limit(handler))

    return await Promise.all(limiteHandlers)
  }
}