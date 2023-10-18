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

import { ButtonUI } from '@/components/UI/ButtonUI';
import { InputUI } from '@/components/UI/InputUI';
import { SelectUI } from '@/components/UI/SelectUI';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { BiSearch } from 'react-icons/bi';
import { TabsUI } from '@/components/UI/TabsUI';
import { MockTabDataUsers } from '@/mocks/tabs';

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
      then: (schema) => schema.required('Necessário selecionar um valor!'),
    })
    .typeError('Valor inválido!'),
  filter2: yup
    .string()
    .when('filter1', {
      is: (value: string) => value != '',
      then: (schema) => schema.required('Necessário selecionar um valor!'),
    })
    .typeError('Valor inválido!'),
});

export const SectionAdmin = () => {
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
          Área Administrativa
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
  );
};