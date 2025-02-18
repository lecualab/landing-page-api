import {
  CONTACT_DATABASE,
  CustomerContact,
} from '@features/contact/contact-database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveContactDto, SaveContactService } from '../application';

@Injectable()
export class SaveContactSqlService implements SaveContactService {
  constructor(
    @InjectRepository(CustomerContact, CONTACT_DATABASE)
    private readonly customerContactRepository: Repository<CustomerContact>,
  ) {}

  async saveContact(saveContactDto: SaveContactDto): Promise<void> {
    const customerContact = this.customerContactRepository.create({
      firstName: saveContactDto.firstName,
      lastName: saveContactDto.lastName,
      email: saveContactDto.email,
      phoneNumber: saveContactDto.phoneNumber,
      company: saveContactDto.company,
      message: saveContactDto.message,
      preferredContactMethods: saveContactDto.preferredContactMethods,
    });

    await this.customerContactRepository.save(customerContact);
  }
}
