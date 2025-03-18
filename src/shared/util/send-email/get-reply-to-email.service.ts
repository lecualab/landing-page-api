import { Injectable } from '@nestjs/common';
import { SendEmailResendDto } from './adapters/send-email';
import { SendEmailReplyToConfig } from './send-email-reply-to.config';
import { SendEmailDto } from './send-email.port';

@Injectable()
export class GetReplyToEmailService {
  constructor(
    private readonly sendEmailReplyToConfig: SendEmailReplyToConfig,
  ) {}

  getReplyToEmail(
    replyTo: SendEmailDto['replyTo'],
  ): SendEmailResendDto['reply_to'] {
    if (!replyTo) return undefined;

    return this.sendEmailReplyToConfig[replyTo];
  }
}
