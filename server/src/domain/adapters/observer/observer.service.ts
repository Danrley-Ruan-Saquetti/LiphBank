export abstract class ObserverService {

  abstract emit(event: string, data: any): void
}