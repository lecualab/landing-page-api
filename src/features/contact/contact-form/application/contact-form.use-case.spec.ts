import { Mocked, TestBed } from '@suites/unit';
import { ContactFormUseCase } from './contact-form.use-case';
import { SAVE_CONTACT_SERVICE, SaveContactService } from './ports';

describe('ContactFormUseCase', () => {
  let underTest: ContactFormUseCase;
  let saveContactService: Mocked<SaveContactService>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(ContactFormUseCase).compile();

    underTest = unit;
    saveContactService = unitRef.get(SAVE_CONTACT_SERVICE);
  });

  describe('execute', () => {
    it('should save contact using the provided parameters', async () => {
      const expected = { foo: 'bar' };

      await underTest.execute(expected as any);

      expect(saveContactService.saveContact).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });
  });
});
