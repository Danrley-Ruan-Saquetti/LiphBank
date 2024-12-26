import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { CatchAllExceptionFilter } from '@presentation/filters/all-exception.filter'
import { PresentationModule } from '@presentation/presentation.module'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    InfrastructureModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchAllExceptionFilter
    }
  ],
})
export class MainModule { }
