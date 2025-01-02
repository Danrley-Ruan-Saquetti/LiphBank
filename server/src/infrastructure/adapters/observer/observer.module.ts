import { Module } from '@nestjs/common'
import { ObserverService } from '@domain/adapters/observer/observer.service'
import { ObserverListenerImplementation } from '@infrastructure/adapters/observer/observer.service'

@Module({
  providers: [
    {
      provide: ObserverService,
      useClass: ObserverListenerImplementation
    }
  ],
  exports: [
    {
      provide: ObserverService,
      useClass: ObserverListenerImplementation
    }
  ]
})
export class InfrastructureObserverModule { }