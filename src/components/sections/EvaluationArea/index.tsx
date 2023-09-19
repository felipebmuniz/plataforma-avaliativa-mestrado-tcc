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
import Image from 'next/image';
import Button from '@/components/UI/Button';

export const EvaluationArea = () => {
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
            Área de Avaliação
          </Badge>

          <Text
            fontSize="2.25rem"
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
                Selecione as turmas que deseja avaliar referente ao semestre que
                está cursando.
              </Center>
            </ListItem>
          </List>
        </VStack>

        <HStack gap="1.5rem" width="100%" flexWrap="wrap" margin="auto">
          <Box
            padding="6"
            boxShadow="lg"
            bg={theme.background500}
            w="18.75rem"
            h="18.75rem"
            borderRadius="0.5rem"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg={theme.background500}
            w="18.75rem"
            h="18.75rem"
            borderRadius="0.5rem"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg={theme.background500}
            w="18.75rem"
            h="18.75rem"
            borderRadius="0.5rem"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg={theme.background500}
            w="18.75rem"
            h="18.75rem"
            borderRadius="0.5rem"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg={theme.background500}
            w="18.75rem"
            h="18.75rem"
            borderRadius="0.5rem"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg={theme.background500}
            w="18.75rem"
            h="18.75rem"
            borderRadius="0.5rem"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box
            padding="6"
            boxShadow="lg"
            bg={theme.background500}
            w="18.75rem"
            h="18.75rem"
            borderRadius="0.5rem"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        </HStack>

        <Box width="100%">
          <HStack gap="2rem" justifyContent="flex-end">
            <Button bg={theme.container500} color={theme.container200}>
              Enviar Avaliação
            </Button>
          </HStack>
        </Box>
      </VStack>
    </HStack>
  );
};
