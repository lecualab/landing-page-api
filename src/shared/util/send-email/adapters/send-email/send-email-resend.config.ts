import { IsString, IsUrl } from 'class-validator';

export class SendEmailResendConfig {
  @IsString()
  readonly RESEND_API_KEY: string;

  @IsUrl()
  readonly RESEND_API_URL: string;
}
