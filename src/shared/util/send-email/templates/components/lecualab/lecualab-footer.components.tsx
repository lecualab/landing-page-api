import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';
import { CONTAINER_PADDING, LECUALAB_WEBSITE_URL } from './constants';

type SocialNetworkDto = Readonly<{
  name: string;
  url: string;
  iconUrl: string;
}>;

export const LecualabFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialNetworks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/profile.php?id=61573503848177',
      iconUrl:
        'https://public-files.lecualab.com/media/images/social-networks/facebook.png',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/lecualab',
      iconUrl:
        'https://public-files.lecualab.com/media/images/social-networks/instagram.png',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/lecualab',
      iconUrl:
        'https://public-files.lecualab.com/media/images/social-networks/linkedin.png',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@Lecualab',
      iconUrl:
        'https://public-files.lecualab.com/media/images/social-networks/youtube.png',
    },
  ] as const satisfies SocialNetworkDto[];

  return (
    <Section
      className={`h-[128px] bg-light-gray text-center mt-[24px] rounded-t-lg py-[8px] ${CONTAINER_PADDING}`}
    >
      <Row>
        <Column>
          <Text className="text-2xl text-dark-gray font-semibold">
            <Button href={LECUALAB_WEBSITE_URL} className="text-black">
              Lecualab
            </Button>
          </Text>
        </Column>
      </Row>
      <Row>
        <Column align="center">
          {socialNetworks.map((socialNetwork) => (
            <Button
              key={socialNetwork.name}
              href={socialNetwork.url}
              className="mx-[10px]"
            >
              <Img
                src={socialNetwork.iconUrl}
                alt={socialNetwork.name}
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(13%) sepia(2%) saturate(6%) hue-rotate(323deg) brightness(101%) contrast(82%)',
                }}
                height="20"
              />
            </Button>
          ))}
        </Column>
      </Row>
      <Row>
        <Column className="text-gray">
          <Text className="!mb-0">
            <span>&copy; {currentYear} Lecualab</span>
          </Text>
          <Text className="!mt-0">
            <span>Todos los derechos reservados</span>
          </Text>
        </Column>
      </Row>
    </Section>
  );
};
