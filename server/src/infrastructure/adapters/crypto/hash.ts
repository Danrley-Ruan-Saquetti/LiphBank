import bcrypt from 'bcrypt'
import { Hash } from '@domain/adapters/crypto/hash'

export class HashImplementation extends Hash {

  async hash(value: string) {
    return await bcrypt.hash(value, 10)
  }

  async compare(value: string, hash: string) {
    return await bcrypt.compare(value, hash)
  }
}