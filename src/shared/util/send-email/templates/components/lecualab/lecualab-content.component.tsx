import { Section } from '@react-email/components';
import React from 'react';
import { CONTAINER_PADDING } from './constants';

export const LecualabContent: React.FC<React.PropsWithChildren> = ({
  children,
}) => <Section className={CONTAINER_PADDING}>{children}</Section>;
