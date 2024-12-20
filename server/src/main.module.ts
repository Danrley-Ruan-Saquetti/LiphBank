import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'
import { PresentationModule } from '@presentation/presentation.module'

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
  providers: [],
})
export class MainModule { }
