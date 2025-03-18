import { EmailTemplate, EmailTemplateParams } from './email-template.type';
import { FromEmail, ReplyToEmail, ToEmail } from './enums';

export type SendEmailDto<TEmailTemplate extends EmailTemplate = EmailTemplate> =
  Readonly<{
    // eslint-disable-next-line sonarjs/no-useless-intersection
    to: ToEmail | (string & {}) | readonly string[];
    from: FromEmail;
    replyTo?: ReplyToEmail;
    template: TEmailTemplate;
    params?: EmailTemplateParams[TEmailTemplate];
  }>;

export type SendEmailService = Readonly<{
  send<TEmailTemplate extends EmailTemplate>(
    sendEmailDto: SendEmailDto<TEmailTemplate>,
  ): Promise<void>;
}>;

export const SEND_INTERNAL_EMAIL_SERVICE = Symbol('SendInternalEmailService');
export const SEND_EXTERNAL_EMAIL_SERVICE = Symbol('SendExternalEmailService');
