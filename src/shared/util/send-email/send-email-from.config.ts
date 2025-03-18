import { IsEmail } from 'class-validator';
import { LECUALAB_DOMAIN } from './constants';

export class SendEmailFromConfig {
  @IsEmail({
    require_display_name: true,
    host_whitelist: [LECUALAB_DOMAIN],
  })
  readonly LECUALAB_HI_EMAIL: string;

  @IsEmail({
    require_display_name: true,
    host_whitelist: [`internal.${LECUALAB_DOMAIN}`],
  })
  readonly LECUALAB_INTERNAL_EMAIL: string;
}
