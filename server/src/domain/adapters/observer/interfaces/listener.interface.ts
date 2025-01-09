export type ListenerActionPerformed<T = any> = (data: T) => Promise<void | any> | void | any

export interface IListener<T = any> {
  perform: ListenerActionPerformed<T>
}