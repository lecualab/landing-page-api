import { Inject, Injectable } from '@nestjs/common';
import {
  FromEmail,
  ReplyToEmail,
  SEND_EXTERNAL_EMAIL_SERVICE,
  SEND_INTERNAL_EMAIL_SERVICE,
  SendEmailService,
  ToEmail,
} from '@shared/util/send-email';
import { ContactFormInputDto } from '../domain/dtos';
import { SAVE_CONTACT_SERVICE, SaveContactService } from './ports';

@Injectable()
export class ContactFormUseCase {
  constructor(
    @Inject(SAVE_CONTACT_SERVICE)
    private readonly saveContactService: SaveContactService,
    @Inject(SEND_EXTERNAL_EMAIL_SERVICE)
    private readonly sendExternalEmailService: SendEmailService,
    @Inject(SEND_INTERNAL_EMAIL_SERVICE)
    private readonly sendInternalEmailService: SendEmailService,
  ) {}

  async execute(input: ContactFormInputDto): Promise<void> {
    await this.saveContactService.saveContact(input);

    await Promise.all([
      this.sendExternalEmailService.send({
        to: input.email,
        from: FromEmail.LECUALAB_HI_EMAIL,
        replyTo: ReplyToEmail.LECUALAB_REPLY_TO_WELCOME_EMAIL,
        template: 'contact-welcome',
        params: { firstName: input.firstName },
      }),
      this.sendInternalEmailService.send({
        to: ToEmail.LECUALAB_INTERNAL_TO_WELCOME_EMAILS,
        from: FromEmail.LECUALAB_INTERNAL_EMAIL,
        template: 'contact-requested',
        params: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phoneNumber: input.phoneNumber,
          contactMessage: input.message,
          companyName: input.company ?? undefined,
          contactMethods: input.preferredContactMethods,
        },
      }),
    ]);
  }
}
