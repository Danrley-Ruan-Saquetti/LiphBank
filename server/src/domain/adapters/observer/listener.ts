import { uuidV4 } from '@shared/utils/uuid'

export type ListenerActionPerformed<T = any> = (data: T) => Promise<void | any> | void | any

export interface IListener<T = any> {
  perform: ListenerActionPerformed<T>
}

export abstract class Listener<T = any> implements IListener {

  readonly id = uuidV4()

  abstract perform(data: T): Promise<void | any> | void | any
}