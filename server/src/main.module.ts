import { Module } from '@nestjs/common'
import { AppModule } from '@app/module'

@Module({
  imports: [
    AppModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule { }
