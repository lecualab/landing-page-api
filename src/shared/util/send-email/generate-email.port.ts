import { SendEmailDto } from './send-email.port';

export type GenerateEmailDto = Pick<SendEmailDto, 'template' | 'params'>;
export type EmailDto = Readonly<{
  subject: string;
  body: string;
}>;

export type GenerateEmailService = Readonly<{
  generate(generateEmailDto: GenerateEmailDto): Promise<EmailDto>;
}>;

export const GENERATE_EMAIL_SERVICE = Symbol('GenerateEmailService');
