import {
  FromEmail,
  ReplyToEmail,
  SEND_EXTERNAL_EMAIL_SERVICE,
  SEND_INTERNAL_EMAIL_SERVICE,
  SendEmailDto,
  SendEmailService,
  ToEmail,
} from '@shared/util/send-email';
import { Mocked, TestBed } from '@suites/unit';
import { ContactFormInputDto } from '../domain/dtos';
import { ContactFormUseCase } from './contact-form.use-case';
import { SAVE_CONTACT_SERVICE, SaveContactService } from './ports';

describe('ContactFormUseCase', () => {
  let underTest: ContactFormUseCase;
  let saveContactService: Mocked<SaveContactService>;
  let sendExternalEmailService: Mocked<SendEmailService>;
  let sendInternalEmailService: Mocked<SendEmailService>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(ContactFormUseCase).compile();

    underTest = unit;
    saveContactService = unitRef.get(SAVE_CONTACT_SERVICE);
    sendExternalEmailService = unitRef.get(SEND_EXTERNAL_EMAIL_SERVICE);
    sendInternalEmailService = unitRef.get(SEND_INTERNAL_EMAIL_SERVICE);
  });

  describe('execute', () => {
    it('should save the contact', async () => {
      const expected = { foo: 'bar' };

      await underTest.execute(expected as any);

      expect(saveContactService.saveContact).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });

    it('should send an email to the contact', async () => {
      const expected = {
        email: 'email',
        firstName: 'first-name',
      } as ContactFormInputDto;

      await underTest.execute(expected);

      expect(sendExternalEmailService.send).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({
          to: expected.email,
          from: FromEmail.LECUALAB_HI_EMAIL,
          replyTo: ReplyToEmail.LECUALAB_REPLY_TO_WELCOME_EMAIL,
          template: 'contact-welcome',
          params: { firstName: expected.firstName },
        } as SendEmailDto<'contact-welcome'>),
      );
    });

    it('should send an email to the internal team', async () => {
      const expected = {
        email: 'email',
        firstName: 'first-name',
        lastName: 'last-name',
        phoneNumber: 'phone-number',
        message: 'message',
        company: 'company',
        preferredContactMethods: ['method' as any],
      } as ContactFormInputDto;

      await underTest.execute(expected);

      expect(sendInternalEmailService.send).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({
          to: ToEmail.LECUALAB_INTERNAL_TO_WELCOME_EMAILS,
          from: expect.any(String),
          template: 'contact-requested',
          params: {
            email: expected.email,
            firstName: expected.firstName,
            lastName: expected.lastName,
            phoneNumber: expected.phoneNumber,
            contactMessage: expected.message,
            companyName: expected.company,
            contactMethods: expected.preferredContactMethods,
          },
        } as SendEmailDto<'contact-requested'>),
      );
    });
  });
});
