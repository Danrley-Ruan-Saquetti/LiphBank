import { Module } from '@nestjs/common'
import { HashImplementation } from '@infrastructure/adapters/crypto/hash'
import { HashService } from '@domain/adapters/crypto/hash.service'

@Module({
  providers: [
    {
      provide: HashService,
      useClass: HashImplementation
    }
  ],
  exports: [
    {
      provide: HashService,
      useClass: HashImplementation
    }
  ]
})
export class InfrastructureHashModule { }