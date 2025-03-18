import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsString,
} from 'class-validator';
import { LECUALAB_DOMAIN } from './constants';

export class SendEmailToConfig {
  @IsString()
  private readonly LECUALAB_INTERNAL_TO_WELCOME_EMAIL: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEmail(
    {
      allow_display_name: true,
      host_whitelist: [LECUALAB_DOMAIN],
    },
    { each: true },
  )
  get LECUALAB_INTERNAL_TO_WELCOME_EMAILS(): string[] {
    return this.LECUALAB_INTERNAL_TO_WELCOME_EMAIL.split(',').map((email) =>
      email.trim(),
    );
  }
}
