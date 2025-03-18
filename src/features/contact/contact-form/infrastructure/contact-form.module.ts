import { Module } from '@nestjs/common';
import { SendEmailModule, SendEmailModuleKind } from '@shared/util/send-email';
import { ContactDatabaseModule } from '../../contact-database';
import { ContactFormUseCase, SAVE_CONTACT_SERVICE } from '../application';
import { ContactFormController } from './contact-form.controller';
import { SaveContactSqlService } from './save-contact-sql.service';

@Module({
  imports: [
    ContactDatabaseModule,
    SendEmailModule.register({ kind: SendEmailModuleKind.EXTERNAL }),
    SendEmailModule.register({ kind: SendEmailModuleKind.INTERNAL }),
  ],
  controllers: [ContactFormController],
  providers: [
    ContactFormUseCase,
    { provide: SAVE_CONTACT_SERVICE, useClass: SaveContactSqlService },
  ],
})
export class ContactFormModule {}
