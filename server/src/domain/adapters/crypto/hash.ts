
export abstract class Hash {

  abstract hash(value: string): Promise<string>
  abstract compare(value: string, reference: string): Promise<boolean>
}