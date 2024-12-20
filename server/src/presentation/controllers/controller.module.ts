import { Module } from '@nestjs/common'
import { PeopleController } from '@presentation/controllers/people.controller'

@Module({
  controllers: [
    PeopleController
  ]
})
export class ControllerModule { }