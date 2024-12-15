import { Module } from '@nestjs/common'
import { PeopleModule } from './people/module'

@Module({
  imports: [
    PeopleModule
  ]
})
export class AppModules { }