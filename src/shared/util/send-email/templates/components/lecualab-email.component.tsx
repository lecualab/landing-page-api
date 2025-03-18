import { Body, Container, Head, Html, Preview } from '@react-email/components';
import React from 'react';
import {
  LecualabContent,
  LecualabFooter,
  LecualabHeader,
  LecualabTheme,
} from './lecualab';

type LecualabEmailProps = Readonly<{
  preview: string;
}>;

export const LecualabEmail: React.FC<
  React.PropsWithChildren<LecualabEmailProps>
> = ({ children, ...props }) => (
  <Html lang="es">
    <LecualabTheme>
      <Head />
      <Body className="font-brand text-dark-gray">
        <Preview>{props.preview}</Preview>
        <Container>
          <LecualabHeader />
          <LecualabContent>{children}</LecualabContent>
          <LecualabFooter />
        </Container>
      </Body>
    </LecualabTheme>
  </Html>
);
