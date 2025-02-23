import { Mocked, TestBed } from '@suites/unit';
import { ContactFormInputDto } from '../domain/dtos';
import { ContactFormUseCase } from './contact-form.use-case';
import {
  NOTIFY_CONTACT_SERVICE,
  NotifyContactService,
  SAVE_CONTACT_SERVICE,
  SaveContactService,
} from './ports';

describe('ContactFormUseCase', () => {
  let underTest: ContactFormUseCase;
  let saveContactService: Mocked<SaveContactService>;
  let notifyContactService: Mocked<NotifyContactService>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(ContactFormUseCase).compile();

    underTest = unit;
    saveContactService = unitRef.get(SAVE_CONTACT_SERVICE);
    notifyContactService = unitRef.get(NOTIFY_CONTACT_SERVICE);
  });

  describe('execute', () => {
    it('should save contact', async () => {
      const expected = { foo: 'bar' };

      await underTest.execute(expected as any);

      expect(saveContactService.saveContact).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });

    it('should notify contact', async () => {
      const expected = {
        firstName: 'first-name',
        email: 'email',
      } as ContactFormInputDto;

      await underTest.execute(expected);

      expect(
        notifyContactService.notifyContact,
      ).toHaveBeenCalledExactlyOnceWith(expected);
    });
  });
});
