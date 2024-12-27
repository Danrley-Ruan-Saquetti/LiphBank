import { Global, Module } from '@nestjs/common'
import { Observer } from '@domain/adapters/observer/observer'
import { ObserverEmitterService } from '@infrastructure/adapters/observer/observer-emitter'

@Module({
  providers: [
    {
      provide: Observer,
      useClass: ObserverEmitterService
    }
  ],
  exports: [
    {
      provide: Observer,
      useClass: ObserverEmitterService
    }
  ]
})
export class InfrastructureObserverModule { }