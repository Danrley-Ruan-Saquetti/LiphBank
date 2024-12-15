import { Module } from '@nestjs/common'
import { AppModules } from './modules/module'

@Module({
  imports: [
    AppModules
  ]
})
export class AppModule { }