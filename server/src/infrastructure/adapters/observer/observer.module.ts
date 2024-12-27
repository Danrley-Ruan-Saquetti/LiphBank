import { Module } from '@nestjs/common'
import { ObserverService } from '@infrastructure/adapters/observer/observer'
import { Observer } from '@domain/adapters/observer/observer'

@Module({
  providers: [
    {
      provide: Observer,
      useClass: ObserverService
    }
  ],
  exports: [
    {
      provide: Observer,
      useClass: ObserverService
    }
  ]
})
export class InfrastructureObserverModule { }