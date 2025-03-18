import { SendEmailToConfig } from '../send-email-to.config';
import { KeysProjection } from './shared';

export const ToEmail = {
  LECUALAB_INTERNAL_TO_WELCOME_EMAILS: 'LECUALAB_INTERNAL_TO_WELCOME_EMAILS',
} as const satisfies KeysProjection<SendEmailToConfig>;

export type ToEmail = (typeof ToEmail)[keyof typeof ToEmail];
