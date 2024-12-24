import { Module } from '@nestjs/common'
import { HashImplementation } from '@infrastructure/adapters/crypto/hash'
import { Hash } from '@domain/adapters/crypto/hash'

@Module({
  providers: [
    HashImplementation,
    {
      provide: Hash,
      useClass: HashImplementation
    }
  ],
  exports: [
    HashImplementation,
    {
      provide: Hash,
      useClass: HashImplementation
    }
  ]
})
export class InfrastructureHashModule { }