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
import { InputUI } from '@/components/UI/InputUI';
import { SelectUI } from '@/components/UI/SelectUI';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { BiSearch } from 'react-icons/bi';

const defaultValues: { search: string; filter1: string; filter2: string } = {
  search: '',
  filter1: '',
  filter2: '',
};

const schemaCreateFilterEvaluationArea = yup.object({
  search: yup.string().required('Deve buscar por alguma turma!'),
  filter1: yup
    .string()
    .when('search', {
      is: (value: string) => value != '',
      then: (schema) => schema.required('Necessário selecionar uma turma!'),
    })
    .typeError('Valor inválido!'),
  filter2: yup
    .string()
    .when('filter1', {
      is: (value: string) => value != '',
      then: (schema) =>
        schema.required('Necessário definir o filtro primário!'),
    })
    .typeError('Valor inválido!'),
});

export const EvaluationArea = () => {
  const theme = useTheme();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaCreateFilterEvaluationArea),
    mode: 'all',
  });

  function onSubmit(values: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
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
      <HStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="100%"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="5rem"
      >
        <HStack w="100%" alignItems="flex-start">
          <InputUI
            register={register}
            errors={errors}
            name="search"
            label="Turma"
            type="text"
            placeholder="Busque pelo nome da Turma"
            icon={<BiSearch />}
            iconPosition="right"
          />

          <SelectUI
            control={control}
            errors={errors}
            name="filter1"
            label="Turma"
            placeholder="Busque pelo nome da Turma"
          />

          <SelectUI
            control={control}
            errors={errors}
            name="filter2"
            label="Turma"
            placeholder="Busque pelo nome da Turma"
          />
        </HStack>
        <VStack h="100%" alignItems="center">
          <Button isLoading={isSubmitting} type="submit" marginTop="2rem">
            Buscar
          </Button>
        </VStack>
      </HStack>

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
  );
};
