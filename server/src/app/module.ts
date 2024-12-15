import { Module } from '@nestjs/common'
import { AppModules } from '@app/modules/module'

@Module({
  imports: [
    AppModules
  ]
})
export class AppModule { }