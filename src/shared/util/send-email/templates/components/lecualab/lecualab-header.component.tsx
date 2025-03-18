import { Button, Column, Img, Row, Section } from '@react-email/components';
import React from 'react';
import { CONTAINER_PADDING, LECUALAB_WEBSITE_URL } from './constants';

export const LecualabHeader: React.FC = () => (
  <Section
    className={`h-[80px] mb-[16px] rounded-b-lg bg-primary ${CONTAINER_PADDING}`}
  >
    <Row>
      <Column align="center">
        <Button href={LECUALAB_WEBSITE_URL} className="text-black">
          <Img
            src="https://public-files.lecualab.com/media/images/logo/lecualab.png"
            alt="Lecualab logo"
            height="50"
          />
        </Button>
      </Column>
    </Row>
  </Section>
);
