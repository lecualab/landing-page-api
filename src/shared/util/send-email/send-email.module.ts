import { SESClient } from '@aws-sdk/client-ses';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import {
  EMAIL_TEMPLATES,
  EmailTemplates,
  GenerateEmailReactService,
} from './adapters/generate-email';
import {
  SendEmailResendConfig,
  SendEmailResendService,
  SendEmailSesService,
} from './adapters/send-email';
import { GENERATE_EMAIL_SERVICE } from './generate-email.port';
import { GetFromEmailService } from './get-from-email.service';
import { GetReplyToEmailService } from './get-reply-to-email.service';
import { GetToEmailService } from './get-to-email.service';
import { SendEmailFromConfig } from './send-email-from.config';
import { SendEmailReplyToConfig } from './send-email-reply-to.config';
import { SendEmailToConfig } from './send-email-to.config';
import {
  SEND_EXTERNAL_EMAIL_SERVICE,
  SEND_INTERNAL_EMAIL_SERVICE,
} from './send-email.port';

export const SendEmailModuleKind = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
} as const;

export type SendEmailModuleKind =
  (typeof SendEmailModuleKind)[keyof typeof SendEmailModuleKind];

export type SendEmailModuleOpts = Readonly<{
  kind: SendEmailModuleKind;
}>;

@Module({})
export class SendEmailModule {
  static register(opts: SendEmailModuleOpts): DynamicModule {
    const baseModule: DynamicModule = {
      module: SendEmailModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: SendEmailFromConfig,
          load: dotenvLoader(),
        }),
        TypedConfigModule.forRoot({
          schema: SendEmailToConfig,
          load: dotenvLoader(),
        }),
        TypedConfigModule.forRoot({
          schema: SendEmailReplyToConfig,
          load: dotenvLoader(),
        }),
      ],
      providers: [
        GetFromEmailService,
        GetReplyToEmailService,
        GetToEmailService,
        {
          provide: GENERATE_EMAIL_SERVICE,
          useClass: GenerateEmailReactService,
        },
        {
          provide: EMAIL_TEMPLATES,
          useValue: {} satisfies EmailTemplates,
        },
      ],
    };

    const moduleSpecs =
      opts.kind === SendEmailModuleKind.EXTERNAL
        ? this.getExternalSpecs()
        : this.getInternalSpecs();

    return {
      ...baseModule,
      imports: [...(baseModule.imports ?? []), ...(moduleSpecs.imports ?? [])],
      providers: [
        ...(baseModule.providers ?? []),
        ...(moduleSpecs.providers ?? []),
      ],
      exports: [...(baseModule.exports ?? []), ...(moduleSpecs.exports ?? [])],
    };
  }

  private static getInternalSpecs(): Omit<DynamicModule, 'module'> {
    return {
      providers: [
        { provide: SEND_INTERNAL_EMAIL_SERVICE, useClass: SendEmailSesService },
        { provide: SESClient, useValue: new SESClient() },
      ],
      exports: [SEND_INTERNAL_EMAIL_SERVICE],
    };
  }

  private static getExternalSpecs(): Omit<DynamicModule, 'module'> {
    return {
      imports: [
        HttpModule.registerAsync({
          imports: [
            TypedConfigModule.forRoot({
              schema: SendEmailResendConfig,
              load: dotenvLoader(),
            }),
          ],
          inject: [SendEmailResendConfig],
          useFactory: ({
            RESEND_API_KEY,
            RESEND_API_URL,
          }: SendEmailResendConfig) => ({
            baseURL: RESEND_API_URL,
            headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
          }),
        }),
      ],
      providers: [
        {
          provide: SEND_EXTERNAL_EMAIL_SERVICE,
          useClass: SendEmailResendService,
        },
      ],
      exports: [SEND_EXTERNAL_EMAIL_SERVICE],
    };
  }
}
