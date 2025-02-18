import { Module } from '@nestjs/common';
import { ContactDatabaseModule } from '../../contact-database';
import { ContactFormUseCase, SAVE_CONTACT_SERVICE } from '../application';
import { ContactFormController } from './contact-form.controller';
import { SaveContactSqlService } from './save-contact-sql.service';

@Module({
  imports: [ContactDatabaseModule],
  controllers: [ContactFormController],
  providers: [
    ContactFormUseCase,
    { provide: SAVE_CONTACT_SERVICE, useClass: SaveContactSqlService },
  ],
})
export class ContactFormModule {}
