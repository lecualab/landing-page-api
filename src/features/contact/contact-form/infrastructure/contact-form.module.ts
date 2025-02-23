import { SESClient } from '@aws-sdk/client-ses';
import { Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { ContactDatabaseModule } from '../../contact-database';
import {
  ContactFormUseCase,
  NOTIFY_CONTACT_SERVICE,
  SAVE_CONTACT_SERVICE,
} from '../application';
import { ContactFormController } from './contact-form.controller';
import { NotifyContactSesService } from './notify-contact-ses.service';
import { NotifyContactConfig } from './notify-contact.config';
import { SaveContactSqlService } from './save-contact-sql.service';

@Module({
  imports: [
    ContactDatabaseModule,
    TypedConfigModule.forRoot({
      schema: NotifyContactConfig,
      load: dotenvLoader(),
      normalize: (config) => {
        [
          'NOTIFY_CONTACT_BCC_EMAILS',
          'NOTIFY_CONTACT_REPLAY_TO_EMAILS',
        ].forEach((key) => {
          const value = config[key] as unknown;
          if (typeof value !== 'string') return;

          config[key] = value.split(',');
        });

        return config;
      },
    }),
  ],
  controllers: [ContactFormController],
  providers: [
    ContactFormUseCase,
    { provide: SAVE_CONTACT_SERVICE, useClass: SaveContactSqlService },
    { provide: NOTIFY_CONTACT_SERVICE, useClass: NotifyContactSesService },
    { provide: SESClient, useValue: new SESClient() },
  ],
})
export class ContactFormModule {}
