import { Test } from '@nestjs/testing';
import React from 'react';
import { Writable } from 'type-fest';
import {
  EMAIL_TEMPLATES,
  EmailTemplates,
  GenerateEmailReactService,
} from './generate-email-react.service';

describe('GenerateEmailReactService', () => {
  let underTest: GenerateEmailReactService;
  let emailTemplates: Writable<EmailTemplates>;

  beforeEach(async () => {
    emailTemplates = {} as any;

    const module = await Test.createTestingModule({
      providers: [
        GenerateEmailReactService,
        { provide: EMAIL_TEMPLATES, useValue: emailTemplates },
      ],
    }).compile();

    underTest = module.get(GenerateEmailReactService);
  });

  describe('generate', () => {
    it('should retrieve the email', async () => {
      const templateName = 'template';

      emailTemplates[templateName as keyof EmailTemplates] = {
        component: () => <div>expected</div>,
        subject: () => '',
      };

      const actual = await underTest.generate({
        template: templateName as any,
      });

      expect(actual.body).toInclude('<div>expected</div>');
    });

    it('should retrieve the subject', async () => {
      const expected = {
        templateName: 'template',
        subject: 'subject',
      };

      emailTemplates[expected.templateName as keyof EmailTemplates] = {
        component: () => <div></div>,
        subject: () => expected.subject,
      };

      const actual = await underTest.generate({
        template: expected.templateName as any,
      });

      expect(actual.subject).toEqual(expected.subject);
    });

    it('should provide the params to the email template', async () => {
      const expected = {
        templateName: 'template',
        component: jest.fn(),
        params: { foo: 'bar' },
      };

      emailTemplates[expected.templateName as keyof EmailTemplates] = {
        component: expected.component,
        subject: () => '',
      };

      await underTest.generate({
        template: expected.templateName as any,
        params: expected.params as any,
      });

      expect(expected.component).toHaveBeenCalledExactlyOnceWith(
        expected.params,
      );
    });

    it('should provide the params to the email subject', async () => {
      const expected = {
        templateName: 'template',
        params: { foo: 'bar' },
        subject: jest.fn(),
      };

      emailTemplates[expected.templateName as keyof EmailTemplates] = {
        component: () => <div></div>,
        subject: expected.subject,
      };

      await underTest.generate({
        template: expected.templateName as any,
        params: expected.params as any,
      });

      expect(expected.subject).toHaveBeenCalledExactlyOnceWith(expected.params);
    });
  });
});
