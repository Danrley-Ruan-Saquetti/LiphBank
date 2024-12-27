export abstract class Observer {

  abstract emit(event: string, data: any): void
}