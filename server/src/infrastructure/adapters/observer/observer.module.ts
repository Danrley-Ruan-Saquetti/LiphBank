import { Module } from '@nestjs/common'
import { ObserverService } from '@domain/adapters/observer/observer.service'
import { ObserverEmitterService } from '@infrastructure/adapters/observer/observer-emitter.service'

@Module({
  providers: [
    {
      provide: ObserverService,
      useClass: ObserverEmitterService
    }
  ],
  exports: [
    {
      provide: ObserverService,
      useClass: ObserverEmitterService
    }
  ]
})
export class InfrastructureObserverModule { }