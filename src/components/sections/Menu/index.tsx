import { hexToRgb } from '@/utils/theme';
import {
  Box,
  Center,
  HStack,
  IconButton,
  ListIcon,
  ListItem,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { Link } from '../../UI/Link';
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import { SectionsMock } from '@/mocks/sections';
import { BiInfoCircle } from 'react-icons/bi';

export const Menu = () => {
  const theme = useTheme();
  return (
    <HStack
      bg={theme.background}
      zIndex="1"
      boxShadow={`0px 2px 4px 0px ${hexToRgb(theme.colorSecundary, 0.25)}`}
      transition="all 0.1s linear"
      alignItems={{
        base: 'flex-start',
        md: 'center',
      }}
      justifyContent={{
        base: 'space-between',
      }}
      gap={{
        base: '2rem',
      }}
      w={{
        base: '100%',
      }}
      h={{
        base: 'fit-content',
      }}
      p={{
        base: '3.5rem 3rem',
        md: '2rem 5rem',
      }}
    >
      <Box>
        <Link
          pos="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="inherit"
          h="3rem"
          w="12rem"
          href="/"
        >
          <Image
            src={'/assets/logos/logo_horizontal.svg'}
            alt="Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </Box>
      <Box>
        <UnorderedList
          listStyleType="none"
          display="flex"
          flexDir={{
            base: 'column',
            md: 'row',
          }}
          alignItems={{
            base: 'flex-start',
            md: 'center',
          }}
          justifyContent={{
            md: 'flex-end',
          }}
          color={{
            base: theme.colorTextTitle,
            md: theme.colorTextTitle,
          }}
          transition="color 0.1s linear"
          w="100%"
          m="0"
          gap="2rem"
          fontSize={{
            base: '1rem',
            md: '0.75rem',
            lg: '1rem',
          }}
          fontWeight="500"
        >
          {SectionsMock &&
            SectionsMock.map((section, i) => (
              <ListItem key={section.src + i}>
                <Link
                  transition="all 0.2s linear"
                  _hover={{
                    color: theme.colorPrimary200,
                    textDecoration: 'solid underline 2px',
                  }}
                  href={section.src}
                >
                  {section.name}
                </Link>
              </ListItem>
            ))}
          <ListItem>
            <Link
              transition="all 0.2s linear"
              _hover={{
                color: theme.colorPrimary200,
                textDecoration: 'solid underline 2px',
              }}
              href={'/'}
            >
              <Center justifyContent="flex-start">
                <ListIcon
                  as={BiInfoCircle}
                  color={theme.colorSecundary800}
                  fontSize="1.5rem"
                />
                Acesso Exclusivo
              </Center>
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </HStack>
  );
};
