import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }
