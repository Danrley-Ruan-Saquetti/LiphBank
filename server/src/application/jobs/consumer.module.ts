import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { InfrastructureMailModule } from '@infrastructure/adapters/mail/mail.module'
import { InfrastructureGeneratorTemplateModule } from '@infrastructure/adapters/generator/template/template.module'
import { InfrastructureRepositoryModule } from '@infrastructure/repositories/repository.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue.email-notification',
    }),
    InfrastructureMailModule,
    InfrastructureGeneratorTemplateModule,
    InfrastructureRepositoryModule,
  ],
  providers: [],
  exports: [
    BullModule,
  ],
})
export class ConsumerModule { }