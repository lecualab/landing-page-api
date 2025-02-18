export const ContactMethod = {
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  PHONE_CALL: 'phone_call',
} as const;

export type ContactMethod = (typeof ContactMethod)[keyof typeof ContactMethod];
