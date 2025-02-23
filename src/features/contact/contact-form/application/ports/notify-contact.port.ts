import { ContactFormInputDto } from '../../domain/dtos';

export type NotifyContactDto = Pick<ContactFormInputDto, 'email' | 'firstName'>;

export type NotifyContactService = Readonly<{
  notifyContact(notifyContactDto: NotifyContactDto): Promise<void>;
}>;

export const NOTIFY_CONTACT_SERVICE = Symbol('NotifyContactService');
