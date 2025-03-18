import { ToEmail } from './enums';
import { GetToEmailService } from './get-to-email.service';
import { SendEmailToConfig } from './send-email-to.config';
import { SendEmailDto } from './send-email.port';

describe('GetToEmailService', () => {
  let underTest: GetToEmailService;

  beforeEach(async () => {
    underTest = new GetToEmailService({
      LECUALAB_INTERNAL_TO_WELCOME_EMAILS: ['bar'],
    } as SendEmailToConfig);
  });

  describe('getToEmail', () => {
    describe.each<{
      desc: string;
      to: SendEmailDto['to'];
      expected: string | readonly string[];
    }>([
      {
        desc: 'predefined',
        to: ToEmail.LECUALAB_INTERNAL_TO_WELCOME_EMAILS,
        expected: ['bar'],
      },
      {
        desc: 'custom',
        to: 'custom',
        expected: 'custom',
      },
      {
        desc: 'array',
        to: ['custom-1', 'custom-2'],
        expected: ['custom-1', 'custom-2'],
      },
    ])('when "to" is $desc email', ({ to, expected }) => {
      it('should return to email', () => {
        const actual = underTest.getToEmail(to);

        expect(actual).toEqual(expected);
      });
    });
  });
});
