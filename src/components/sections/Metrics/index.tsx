import {
  Badge,
  Box,
  Center,
  HStack,
  List,
  ListIcon,
  ListItem,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { hexToRgb } from '@/utils/theme';
import { BiInfoCircle } from 'react-icons/bi';
import Button from '@/components/UI/Button';

export const Metrics = () => {
  const theme = useTheme();
  return (
    <HStack
      w="100%"
      maxW="1920px"
      margin="auto"
      padding="5rem"
      bg={theme.background}
      alignItems="flex-start"
      justifyContent="flex-start"
      height="auto"
    >
      <VStack
        alignItems="flex-start"
        justifyContent="flex-start"
        gap="3rem"
        h="100%"
        w="100%"
      >
        <VStack
          width="100%"
          gap="1.5rem"
          alignItems="inherit"
          justifyContent="inherit"
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
            Métricas das Avaliações
          </Badge>

          <Text
            fontSize="2.25rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="130%"
          >
            Pesquise e análise os rendimento durante o semestre.
          </Text>

          <List spacing={3} color={theme.colorText}>
            <ListItem>
              <Center justifyContent="flex-start">
                <ListIcon
                  as={BiInfoCircle}
                  color={theme.colorSecundary800}
                  fontSize="1.5rem"
                />
                Selecione a turma que deseja visualizar os dados referente ao
                semestre que está cursando.
              </Center>
            </ListItem>
          </List>
        </VStack>
      </VStack>
    </HStack>
  );
};
