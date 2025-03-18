import { Inject, Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import React from 'react';
import { EmailTemplate } from '../../email-template.type';
import {
  EmailDto,
  GenerateEmailDto,
  GenerateEmailService,
} from '../../generate-email.port';

export const EMAIL_TEMPLATES = Symbol('EmailTemplates');
export type EmailTemplates = Readonly<
  Record<
    EmailTemplate,
    Readonly<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: React.FC<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subject: (params?: any) => string;
    }>
  >
>;

@Injectable()
export class GenerateEmailReactService implements GenerateEmailService {
  constructor(
    @Inject(EMAIL_TEMPLATES)
    private readonly emailTemplates: EmailTemplates,
  ) {}

  async generate({ template, params }: GenerateEmailDto): Promise<EmailDto> {
    const { subject, component: EmailTemplate } =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.emailTemplates[template]!;

    return {
      subject: subject(params),
      body: await render(<EmailTemplate {...(params ?? {})} />),
    };
  }
}
