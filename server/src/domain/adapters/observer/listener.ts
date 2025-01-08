import { uuidV4 } from '@shared/utils/uuid'

export abstract class Listener<T = any> {

  readonly id = uuidV4()

  abstract perform(data: T): Promise<void | any> | void | any
}