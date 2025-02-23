import { SESClient } from '@aws-sdk/client-ses';
import { Module } from '@nestjs/common';
import { ContactDatabaseModule } from '../../contact-database';
import {
  ContactFormUseCase,
  NOTIFY_CONTACT_SERVICE,
  SAVE_CONTACT_SERVICE,
} from '../application';
import { ContactFormController } from './contact-form.controller';
import { NotifyContactSesService } from './notify-contact-ses.service';
import { SaveContactSqlService } from './save-contact-sql.service';

@Module({
  imports: [ContactDatabaseModule],
  controllers: [ContactFormController],
  providers: [
    ContactFormUseCase,
    { provide: SAVE_CONTACT_SERVICE, useClass: SaveContactSqlService },
    { provide: NOTIFY_CONTACT_SERVICE, useClass: NotifyContactSesService },
    { provide: SESClient, useValue: new SESClient() },
  ],
})
export class ContactFormModule {}
