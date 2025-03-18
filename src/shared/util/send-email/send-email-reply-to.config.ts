import { IsEmail } from 'class-validator';
import { LECUALAB_DOMAIN } from './constants';

export class SendEmailReplyToConfig {
  @IsEmail({
    require_display_name: true,
    host_whitelist: [LECUALAB_DOMAIN],
  })
  readonly LECUALAB_REPLY_TO_WELCOME_EMAIL: string;
}
