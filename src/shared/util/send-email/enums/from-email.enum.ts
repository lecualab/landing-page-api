import { SendEmailFromConfig } from '../send-email-from.config';
import { KeysProjection } from './shared';

export const FromEmail = {
  LECUALAB_HI_EMAIL: 'LECUALAB_HI_EMAIL',
  LECUALAB_INTERNAL_EMAIL: 'LECUALAB_INTERNAL_EMAIL',
} as const satisfies KeysProjection<SendEmailFromConfig>;

export type FromEmail = (typeof FromEmail)[keyof typeof FromEmail];
