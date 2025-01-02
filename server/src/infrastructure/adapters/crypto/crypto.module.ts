import { Module } from '@nestjs/common'
import { HashServiceImplementation } from '@infrastructure/adapters/crypto/hash.service'
import { HashService } from '@domain/adapters/crypto/hash.service'

@Module({
  providers: [
    {
      provide: HashService,
      useClass: HashServiceImplementation
    }
  ],
  exports: [
    {
      provide: HashService,
      useClass: HashServiceImplementation
    }
  ]
})
export class InfrastructureHashModule { }