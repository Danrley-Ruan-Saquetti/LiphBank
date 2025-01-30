export type ConcurrencyParallelismHandler<T = void> = () => Promise<T>
export type ConcurrencyParallelismOptions = {
  concurrences?: number
}

export abstract class ConcurrencyService {

  abstract parallelism<T = void>(handlers: ConcurrencyParallelismHandler<T>[], options?: ConcurrencyParallelismOptions): Promise<T[]>
}