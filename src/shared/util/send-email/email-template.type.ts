import { ReadonlyDeep } from 'type-fest';

export type EmailTemplate = keyof EmailTemplateParams;
export type EmailTemplateParams = ReadonlyDeep<Record<string, unknown>>;
