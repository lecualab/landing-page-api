import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from '@aws-sdk/client-ses';
import { Mocked, TestBed } from '@suites/unit';
import {
  GENERATE_EMAIL_SERVICE,
  GenerateEmailService,
} from '../../generate-email.port';
import { GetFromEmailService } from '../../get-from-email.service';
import { GetToEmailService } from '../../get-to-email.service';
import { SendEmailDto } from '../../send-email.port';
import { SendEmailSesService } from './send-email-ses.service';

jest.mock('@aws-sdk/client-ses');
const SendEmailCommandMock = jest.mocked(SendEmailCommand);

describe('SendEmailSesService', () => {
  let underTest: SendEmailSesService;
  let sesClient: Mocked<SESClient>;
  let generateEmailService: Mocked<GenerateEmailService>;
  let getFromEmailService: Mocked<GetFromEmailService>;
  let getToEmailService: Mocked<GetToEmailService>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(SendEmailSesService).compile();

    underTest = unit;
    sesClient = unitRef.get(SESClient);
    generateEmailService = unitRef.get(GENERATE_EMAIL_SERVICE);
    getFromEmailService = unitRef.get(GetFromEmailService);
    getToEmailService = unitRef.get(GetToEmailService);
  });

  describe('send', () => {
    beforeEach(() => {
      getToEmailService.getToEmail.mockReturnValue('');
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
        subject: 'subject',
        body: 'body',
      };

      getToEmailService.getToEmail.mockReturnValueOnce(expected.to);
      getFromEmailService.getFromEmail.mockReturnValueOnce(commonExpected.from);
      generateEmailService.generate.mockResolvedValueOnce({
        subject: commonExpected.subject,
        body: commonExpected.body,
      });

      await underTest.send(expected);

      expect(SendEmailCommandMock).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({
          Source: commonExpected.from,
          Destination: {
            ToAddresses: Array.isArray(expected.to)
              ? expected.to
              : [expected.to],
          },
          Message: {
            Subject: { Data: commonExpected.subject },
            Body: { Html: { Data: commonExpected.body } },
          },
        } as SendEmailCommandInput),
      );

      expect(sesClient.send).toHaveBeenCalledExactlyOnceWith(
        expect.any(SendEmailCommand),
      );
    });

    it('should set "from" email based on the provided from email', async () => {
      const expected = 'from';

      await underTest.send({ from: expected as any } as SendEmailDto);

      expect(getFromEmailService.getFromEmail).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });

    it('should set "to" email based on the provided reply to email', async () => {
      const expected = 'to';

      await underTest.send({ to: expected as any } as SendEmailDto);

      expect(getToEmailService.getToEmail).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
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
