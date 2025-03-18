import { HttpService } from '@nestjs/axios';
import { Mocked, TestBed } from '@suites/unit';
import { of } from 'rxjs';
import {
  GENERATE_EMAIL_SERVICE,
  GenerateEmailService,
} from '../../generate-email.port';
import { GetFromEmailService } from '../../get-from-email.service';
import { GetReplyToEmailService } from '../../get-reply-to-email.service';
import { SendEmailDto } from '../../send-email.port';
import {
  SendEmailResendDto,
  SendEmailResendService,
} from './send-email-resend.service';

describe('SendEmailResendService', () => {
  let underTest: SendEmailResendService;
  let generateEmailService: Mocked<GenerateEmailService>;
  let httpService: Mocked<HttpService>;
  let getFromEmailService: Mocked<GetFromEmailService>;
  let getReplyToEmailService: Mocked<GetReplyToEmailService>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      SendEmailResendService,
    ).compile();

    underTest = unit;
    generateEmailService = unitRef.get(GENERATE_EMAIL_SERVICE);
    httpService = unitRef.get(HttpService);
    getFromEmailService = unitRef.get(GetFromEmailService);
    getReplyToEmailService = unitRef.get(GetReplyToEmailService);
  });

  describe('send', () => {
    beforeEach(() => {
      httpService.post.mockReturnValue(of(void 0 as any));
      generateEmailService.generate.mockResolvedValue({
        body: '',
        subject: '',
      });
    });

    it.each<{ desc: string; expected: SendEmailDto }>([
      {
        desc: 'single recipient',
        expected: {
          to: 'to',
        } as SendEmailDto,
      },
      {
        desc: 'multiple recipients',
        expected: {
          to: ['to-1', 'to-2'] as any,
        } as SendEmailDto,
      },
    ])('should send email to $desc', async ({ expected }) => {
      const commonExpected = {
        from: 'from',
        replyTo: 'reply-to',
        body: 'html',
        subject: 'subject',
      };

      getFromEmailService.getFromEmail.mockReturnValueOnce(commonExpected.from);
      getReplyToEmailService.getReplyToEmail.mockReturnValueOnce(
        commonExpected.replyTo,
      );
      generateEmailService.generate.mockResolvedValueOnce({
        body: commonExpected.body,
        subject: commonExpected.subject,
      });

      await underTest.send(expected);

      expect(httpService.post).toHaveBeenCalledExactlyOnceWith(
        expect.any(String),
        expect.objectContaining({
          to: expected.to,
          from: commonExpected.from,
          reply_to: commonExpected.replyTo,
        } as SendEmailResendDto),
      );
    });

    it('should set from email based on the provided from email', async () => {
      const expected = 'from';

      await underTest.send({ from: expected as any } as SendEmailDto);

      expect(getFromEmailService.getFromEmail).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });

    it('should set reply to email based on the provided reply to email', async () => {
      const expected = 'reply-to';

      await underTest.send({ replyTo: expected as any } as SendEmailDto);

      expect(
        getReplyToEmailService.getReplyToEmail,
      ).toHaveBeenCalledExactlyOnceWith(expected);
    });

    it('should generate email body using the provided template and params', async () => {
      const expected = {
        template: 'template' as any,
        params: { foo: 'bar' } as any,
      } satisfies Pick<SendEmailDto, 'template' | 'params'>;

      await underTest.send(expected as any);

      expect(generateEmailService.generate).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });
  });
});
