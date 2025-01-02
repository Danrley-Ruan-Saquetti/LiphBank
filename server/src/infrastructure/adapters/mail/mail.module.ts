import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailServiceImplementation } from '@infrastructure/adapters/mail/mail.service'
import { MailService } from '@domain/adapters/mail/mail.service'
import { env } from '@shared/env'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env('MAIL_HOST'),
        port: env('MAIL_PORT'),
        auth: {
          user: env('MAIL_USER'),
          pass: env('MAIL_PORT'),
        },
      },
      defaults: {
        from: env('MAIL_DEFAULT_FROM'),
      },
      template: {
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [
    {
      provide: MailService,
      useClass: MailServiceImplementation
    },
  ],
  exports: [
    {
      provide: MailService,
      useClass: MailServiceImplementation
    },
  ]
})
export class MailModule { }