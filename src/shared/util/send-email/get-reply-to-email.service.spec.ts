import { TestBed } from '@suites/unit';
import { GetReplyToEmailService } from './get-reply-to-email.service';
import { SendEmailReplyToConfig } from './send-email-reply-to.config';

describe('GetReplyToEmailService', () => {
  let underTest: GetReplyToEmailService;

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(GetReplyToEmailService)
      .mock(SendEmailReplyToConfig)
      .impl(() => ({ foo: 'bar' }) as any)
      .compile();

    underTest = unit;
  });

  describe('getReplyToEmail', () => {
    it('should return "reply-to" email', () => {
      const actual = underTest.getReplyToEmail('foo' as any);

      expect(actual).toBe('bar');
    });

    describe('when "reply-to" is not provided', () => {
      it('should return "undefined"', () => {
        const actual = underTest.getReplyToEmail(undefined);

        expect(actual).toBeUndefined();
      });
    });
  });
});
