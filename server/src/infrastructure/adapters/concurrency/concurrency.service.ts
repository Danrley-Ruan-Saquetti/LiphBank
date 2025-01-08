import { Injectable, Scope } from '@nestjs/common'
import pLimit from 'p-limit'
import { ConcurrencyParallelismHandler, ConcurrencyService, ConcurrencyParallelismOptions } from '@domain/adapters/concurrency/concurrency.serivce'

@Injectable({ scope: Scope.REQUEST })
export class ConcurrencyServiceImplemntation extends ConcurrencyService {

  async parallelism<T extends any = void>(handlers: ConcurrencyParallelismHandler<T>[], { concurrencies = 1 }: ConcurrencyParallelismOptions = {}) {
    const limit = pLimit(concurrencies)

    const limiteHandlers = handlers.map((handler) => limit(handler))

    return await Promise.all(limiteHandlers)
  }
}