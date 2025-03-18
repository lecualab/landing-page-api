import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  GENERATE_EMAIL_SERVICE,
  GenerateEmailService,
} from '../../generate-email.port';
import { GetFromEmailService } from '../../get-from-email.service';
import { GetReplyToEmailService } from '../../get-reply-to-email.service';
import { SendEmailDto, SendEmailService } from '../../send-email.port';

export type SendEmailResendDto = Readonly<
  Pick<SendEmailDto, 'to'> & {
    from: string;
    reply_to?: string;
    subject: string;
    html: string;
  }
>;

@Injectable()
export class SendEmailResendService implements SendEmailService {
  constructor(
    @Inject(GENERATE_EMAIL_SERVICE)
    private readonly generateEmailService: GenerateEmailService,
    private readonly httpService: HttpService,
    private readonly getFromEmailService: GetFromEmailService,
    private readonly getReplyToEmailService: GetReplyToEmailService,
  ) {}

  async send(sendEmailDto: SendEmailDto): Promise<void> {
    const { subject, body } = await this.generateEmailService.generate({
      template: sendEmailDto.template,
      params: sendEmailDto.params,
    });

    await firstValueFrom(
      this.httpService.post('emails', {
        to: sendEmailDto.to,
        from: this.getFromEmailService.getFromEmail(sendEmailDto.from),
        reply_to: this.getReplyToEmailService.getReplyToEmail(
          sendEmailDto.replyTo,
        ),
        subject: subject,
        html: body,
      } satisfies SendEmailResendDto),
    );
  }
}
