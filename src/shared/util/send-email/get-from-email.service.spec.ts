import { TestBed } from '@suites/unit';
import { GetFromEmailService } from './get-from-email.service';
import { SendEmailFromConfig } from './send-email-from.config';

describe('GetFromEmailService', () => {
  let underTest: GetFromEmailService;

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(GetFromEmailService)
      .mock(SendEmailFromConfig)
      .impl(() => ({ foo: 'bar' }) as any)
      .compile();

    underTest = unit;
  });

  describe('getFromEmail', () => {
    it('should return "from" email', () => {
      const actual = underTest.getFromEmail('foo' as any);

      expect(actual).toBe('bar');
    });
  });
});
