import {
  Button,
  Column,
  Heading,
  Hr,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';
import { EmailTemplateParams } from '../../email-template.type';
import { LecualabEmail } from '../components';

type ContactWelcomeEmailProps = EmailTemplateParams['contact-welcome'];

export const ContactWelcomeEmailSubject = ({
  firstName,
}: ContactWelcomeEmailProps) => `Hola ${firstName}, somos Lecualab 🦆`;

export const ContactWelcomeEmail: React.FC<ContactWelcomeEmailProps> = (
  props,
) => {
  const heading = '¡Nos emociona conocer tu proyecto!';

  const welcomeVideo = {
    src: 'https://www.youtube.com/watch?v=GpF_eALhPTY',
    thumbnail: 'https://i.ytimg.com/vi/GpF_eALhPTY/hq720.jpg',
  } as const;

  return (
    <LecualabEmail preview={heading}>
      <Row>
        <Column>
          <Heading as="h1" className="text-3xl">
            {heading}
          </Heading>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text>
            Hola {props.firstName}, nos alegra que quieras trabajar con
            nosotros.
          </Text>
          <Text>
            Dentro de poco nos pondremos en contacto contigo para concretar
            todos los detalles y darle vida a lo que tienes en mente.
          </Text>
          <Hr />
          <Section className="mt-[16px] mb-[20px]">
            <Row>
              <Column>
                <Text className="!mt-0">
                  Por mientras, te dejamos este video de bienvenida al
                  laboratorio 🦆
                </Text>
              </Column>
            </Row>
            <Row align="left" className="md:w-[384px]">
              <Column>
                <Button href={welcomeVideo.src}>
                  <Img
                    src={welcomeVideo.thumbnail}
                    alt="Welcome video"
                    width="100%"
                    className="rounded-lg"
                  />
                </Button>
                <Button
                  href={welcomeVideo.src}
                  className="box-border w-full rounded-lg bg-accent p-[12px] mt-[12px] text-center font-semibold text-white"
                >
                  Ver video
                </Button>
              </Column>
            </Row>
          </Section>
          <Hr />
          <Text>¡Nos vemos pronto! 🚀</Text>
        </Column>
      </Row>
    </LecualabEmail>
  );
};

// @ts-expect-error - Required for email template preview
ContactWelcomeEmail.PreviewProps = {
  firstName: 'Lecualina',
} satisfies ContactWelcomeEmailProps;

export default ContactWelcomeEmail;
