import { Tailwind } from '@react-email/components';
import React from 'react';

export const LecualabTheme: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Tailwind
    config={{
      theme: {
        colors: {
          primary: '#1DADB5',
          secondary: '#F28F31',
          terciary: '#EEE5E9',
          accent: '#AA4465',
          white: '#FFFFFF',
          'light-gray': '#E6E6E6',
          gray: '#808080',
          'dark-gray': '#262626',
          black: '#0D0D0D',
        },
        fontFamily: {
          brand: ['Helvetica', 'Arial', 'sans-serif'],
        },
      },
    }}
  >
    {children}
  </Tailwind>
);
