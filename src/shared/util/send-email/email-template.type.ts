import { ReadonlyDeep } from 'type-fest';

export type EmailTemplate = keyof EmailTemplateParams;
export type EmailTemplateParams = ReadonlyDeep<{
  'contact-welcome': {
    firstName: string;
  };
  'contact-requested': {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    contactMessage: string;
    companyName?: string;
    contactMethods: string[];
  };
}>;
