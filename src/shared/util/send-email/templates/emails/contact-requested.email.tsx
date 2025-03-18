import {
  Column,
  Heading,
  Hr,
  Row,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';
import { EmailTemplateParams } from '../../email-template.type';
import { LecualabEmail } from '../components';

type ContactRequestedEmailProps = EmailTemplateParams['contact-requested'];

export const ContactRequestedEmailSubject = () =>
  `¡Nuevo potencial cliente! 🦆`;

export const ContactRequestedEmail: React.FC<ContactRequestedEmailProps> = (
  props,
) => {
  const tableStructure = [
    { columnName: 'Nombre', value: `${props.firstName} ${props.lastName}` },
    { columnName: 'Email', value: props.email },
    { columnName: 'Teléfono', value: props.phoneNumber },
    { columnName: 'Empresa', value: props.companyName },
    { columnName: 'Mensaje', value: props.contactMessage },
    {
      columnName: 'Contacto',
      value: props.contactMethods.join(', '),
    },
  ] as const satisfies { columnName: string; value?: string }[];

  return (
    <LecualabEmail preview="Tenemos un potencial cliente">
      <Section>
        <Row>
          <Column>
            <Heading as="h1" className="text-3xl">
              ¡Nuevo potencial cliente!
            </Heading>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text>
              Nos ha llegado una nueva solicitud de contacto con la siguiente
              información:
            </Text>
          </Column>
        </Row>
        {tableStructure.map(({ columnName, value }) => (
          <Row key={columnName} className="hyphens-auto text-pretty">
            <Hr />
            <Column className="w-1/3 md:w-1/4">
              <Text className="font-semibold">{columnName}</Text>
            </Column>
            <Column>
              <Text>{value}</Text>
            </Column>
          </Row>
        ))}
        <Hr />
      </Section>
    </LecualabEmail>
  );
};

// @ts-expect-error - Required for email template preview
ContactRequestedEmail.PreviewProps = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  companyName: 'Acme Inc.',
  contactMessage: `
¡Hola!

Quería comentarles sobre un problema con mi pedido #12345, que recibí el 10 de marzo. El paquete llegó sin problemas, pero uno de los productos, una lámpara de escritorio, está dañado. La base tiene una grieta que no me permite usarla correctamente.

He adjuntado algunas fotos para que puedan ver el daño y también la factura de compra. ¿Sería posible cambiar la lámpara o, si no, hacer un reembolso?

Agradecería mucho su ayuda con esto. Quedo pendiente de su respuesta.

¡Gracias!
`,
  phoneNumber: '+56987654321',
  contactMethods: ['Email', 'Teléfono', 'WhatsApp'],
} satisfies ContactRequestedEmailProps;

export default ContactRequestedEmail;
