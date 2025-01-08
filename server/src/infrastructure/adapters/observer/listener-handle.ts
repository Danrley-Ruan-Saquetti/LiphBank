import { Listener, ListenerActionPerformed } from '@domain/adapters/observer/listener'

export class ListenerHandle<T = any> extends Listener<T> {

  constructor(
    public perform: ListenerActionPerformed<T>
  ) {
    super()
  }
}