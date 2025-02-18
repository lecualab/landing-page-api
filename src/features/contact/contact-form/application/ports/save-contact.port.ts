import { ContactFormInputDto } from '../../domain/dtos';

export type SaveContactDto = ContactFormInputDto;

export type SaveContactService = Readonly<{
  saveContact(saveContactDto: SaveContactDto): Promise<void>;
}>;

export const SAVE_CONTACT_SERVICE = Symbol('SaveContactService');
