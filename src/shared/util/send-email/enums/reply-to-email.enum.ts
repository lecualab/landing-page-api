import { SendEmailReplyToConfig } from '../send-email-reply-to.config';
import { KeysProjection } from './shared';

export const ReplyToEmail = {
  LECUALAB_REPLY_TO_WELCOME_EMAIL: 'LECUALAB_REPLY_TO_WELCOME_EMAIL',
} as const satisfies KeysProjection<SendEmailReplyToConfig>;

export type ReplyToEmail = (typeof ReplyToEmail)[keyof typeof ReplyToEmail];
