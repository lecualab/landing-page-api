import {
  CONTACT_DATABASE,
  CustomerContact,
} from '@features/contact/contact-database';
import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked } from '@suites/unit';
import { Repository } from 'typeorm';
import { SaveContactDto } from '../application';
import { SaveContactSqlService } from './save-contact-sql.service';

describe('SaveContactSqlService', () => {
  let underTest: SaveContactSqlService;
  let customerContactRepository: Mocked<Repository<CustomerContact>>;

  beforeEach(async () => {
    const CUSTOMER_CONTACT_REPOSITORY = getRepositoryToken(
      CustomerContact,
      CONTACT_DATABASE,
    );

    const module = await Test.createTestingModule({
      providers: [
        SaveContactSqlService,
        { provide: CUSTOMER_CONTACT_REPOSITORY, useValue: createMock() },
      ],
    }).compile();

    underTest = module.get(SaveContactSqlService);
    customerContactRepository = module.get(CUSTOMER_CONTACT_REPOSITORY);
  });

  describe('saveContact', () => {
    it('should save contact', async () => {
      const expected = { foo: 'bar' };

      customerContactRepository.create.mockReturnValueOnce(expected as any);

      await underTest.saveContact({} as any);

      expect(customerContactRepository.save).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });

    it('should create contact using the provided parameters', async () => {
      const expected: SaveContactDto = {
        firstName: 'first-name',
        lastName: 'last-name',
        email: 'email',
        phoneNumber: 'phone-number',
        company: 'company',
        message: 'message',
        preferredContactMethods: [
          'contact-method-1' as any,
          'contact-method-2' as any,
        ],
      };

      await underTest.saveContact(expected);

      expect(customerContactRepository.create).toHaveBeenCalledExactlyOnceWith(
        expected,
      );
    });
  });
});
