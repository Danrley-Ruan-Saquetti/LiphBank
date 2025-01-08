export type ConcurrencyParallelismHandler<T extends any = void> = () => Promise<T>
export type ConcurrencyParallelismOptions = {
  concurrencies?: number
}

export abstract class ConcurrencyService {

  abstract parallelism<T extends any = void>(handlers: ConcurrencyParallelismHandler<T>[], options?: ConcurrencyParallelismOptions): Promise<T[]>
}