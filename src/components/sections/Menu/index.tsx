import { hexToRgb } from '@/utils/theme';
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  ListIcon,
  ListItem,
  Stack,
  UnorderedList,
  Menu as MenuCustom,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import Image from 'next/image';

import { Link } from '../../UI/Link';

import { useTheme } from '@emotion/react';

import { BiCog, BiInfoCircle, BiLogOut } from 'react-icons/bi';
import { BiUser } from 'react-icons/bi';

import PopoverLogin from '@/components/UI/PopoverLogin';
import { ButtonUI } from '@/components/UI/ButtonUI';

import { SectionsMock } from '@/mocks/sections';
import { SectionsAdminMock } from '@/mocks/sectionsAdmin';

import { typeComponent } from '@/types/sectionsAdim';

export const Menu = ({ typeSection }: { typeSection?: 'admin' }) => {
  const theme = useTheme();

  const changeComponentsLinksMenu = (type: typeComponent, label: string) => {
    switch (type) {
      case 'button':
        return (
          <ButtonUI bg={theme.container500} color={theme.container200}>
            {label}
          </ButtonUI>
        );

      case 'link':
        return label;

      default:
        return label;
    }
  };

  const changeLinksMenu = (type: 'admin' | undefined) => {
    switch (type) {
      case 'admin':
        return (
          <>
            {SectionsAdminMock &&
              SectionsAdminMock.map((section, i) => (
                <ListItem key={section.src + i}>
                  <Link
                    transition="all 0.2s linear"
                    _hover={{
                      color: theme.colorPrimary200,
                      textDecoration: section.textDecoration
                        ? 'solid underline 2px'
                        : 'none',
                    }}
                    href={section.src}
                  >
                    {changeComponentsLinksMenu(section.type, section.label)}
                  </Link>
                </ListItem>
              ))}

            <ListItem>
              <MenuCustom>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<BiUser size="1.5rem" />}
                  h="3rem"
                  py="1rem"
                  px="1rem"
                  variant="outline"
                />

                <MenuList>
                  <MenuItem
                    icon={
                      <BiCog
                        color={theme.colorSecundary800}
                        fontSize="1.2rem"
                      />
                    }
                  >
                    Configurações
                  </MenuItem>
                  <MenuItem
                    icon={
                      <BiLogOut
                        color={theme.colorSecundary800}
                        fontSize="1.2rem"
                      />
                    }
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </MenuCustom>
            </ListItem>
          </>
        );

      default:
        return (
          <>
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
              <PopoverLogin>
                <Button
                  justifyContent="flex-start"
                  color={theme.colorTextTitle}
                  py="1rem "
                  px="2rem"
                  h="3rem"
                  textTransform="uppercase"
                  leftIcon={
                    <BiInfoCircle
                      color={theme.colorSecundary800}
                      fontSize="1.5rem"
                    />
                  }
                >
                  Acesso Exclusivo
                </Button>
              </PopoverLogin>
            </ListItem>
          </>
        );
    }
  };

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
        {changeLinksMenu(typeSection)}
      </UnorderedList>
    </HStack>
  );
};
