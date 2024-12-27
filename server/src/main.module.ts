import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ResultInterceptor } from '@presentation/interceptors/result.interceptor'
import { PresentationModule } from '@presentation/presentation.module'
import { CatchAllExceptionFilter } from '@presentation/filters/all-exception.filter'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'
import { ApplicationModule } from '@application/application.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    InfrastructureModule,
    PresentationModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchAllExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResultInterceptor,
    },
  ],
})
export class MainModule { }
