import {
  Badge,
  Box,
  Center,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { hexToRgb } from '@/utils/theme';
import { BiInfoCircle } from 'react-icons/bi';
import Image from 'next/image';
import Button from '@/components/UI/Button';

export const LandingPage = () => {
  const theme = useTheme();
  return (
    <HStack
      w="100%"
      maxW="1920px"
      margin="auto"
      padding="5rem"
      bg={theme.background}
      alignItems="flex-start"
      justifyContent="space-between"
      height="auto"
    >
      <VStack
        alignItems="flex-start"
        justifyContent="flex-start"
        gap="2rem"
        height="100%"
      >
        <Badge
          p={'0.25rem 1.25rem'}
          borderRadius={'0.5rem'}
          bg={hexToRgb(theme.container200, 0.3)}
          fontSize="0.8125rem"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="150%"
          letterSpacing="0.13rem"
        >
          Nova Plataforma
        </Badge>
        <Text
          maxW="38.0625rem;"
          fontSize="3rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="130%"
        >
          Plataforma de avaliação institucional e educacional do mestrado.
        </Text>
        <List spacing={3} color={theme.colorText}>
          <ListItem>
            <Center justifyContent="flex-start">
              <ListIcon
                as={BiInfoCircle}
                color={theme.colorSecundary800}
                fontSize="1.5rem"
              />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Center>
          </ListItem>
          <ListItem>
            <Center justifyContent="flex-start">
              <ListIcon
                as={BiInfoCircle}
                color={theme.colorSecundary800}
                fontSize="1.5rem"
              />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Center>
          </ListItem>
          <ListItem>
            <Center justifyContent="flex-start">
              <ListIcon
                as={BiInfoCircle}
                color={theme.colorSecundary800}
                fontSize="1.5rem"
              />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Center>
          </ListItem>
        </List>
        <HStack gap="2rem">
          <Button>Cadastro</Button>
          <Button bg={theme.container500} color={theme.container200}>
            Login
          </Button>
        </HStack>
      </VStack>
      <VStack>
        <Box
          pos="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="inherit"
          h="38rem"
          w="43rem"
        >
          <Image
            src={'/assets/imagens/ilustration.svg'}
            alt="ilustration"
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </VStack>
    </HStack>
  );
};
