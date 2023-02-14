import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { NatsModule, NatsProvider } from '@common/libs';
import { ENUM } from '@common/interface';

import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: Number(config.get('EMAIL_PORT')),
          secure: false,
          auth: {
            user: config.get('EMAIL_AUTH_USER'),
            pass: config.get('EMAIL_AUTH_PASSWORD'),
          },
        },
        defaults: {
          from: config.get('EMAIL_FROM'),
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    NatsModule([
      {
        name: ENUM.NatsServicesName.API,
        queue: ENUM.NatsServicesQueue.API,
      },
      {
        name: ENUM.NatsServicesName.ORDER,
        queue: ENUM.NatsServicesQueue.ORDER,
      },
      {
        name: ENUM.NatsServicesName.EXCHEQUER,
        queue: ENUM.NatsServicesQueue.EXCHEQUER,
      },
      {
        name: ENUM.NatsServicesName.USER,
        queue: ENUM.NatsServicesQueue.USER,
      },
    ]),
  ],
  controllers: [EmailController],
  providers: [
    EmailService,
    NatsProvider({
      provide: ENUM.NatsServicesName.EMAIL,
      queue: ENUM.NatsServicesQueue.EMAIL,
    }),
  ],
})
export class EmailModule {}
