import { ContactMethod } from '@features/contact/contact-database';

export type ContactFormInputDto = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string | null;
  message: string;
  preferredContactMethods: readonly ContactMethod[];
}>;
