import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { hexToRgb } from '@/utils/theme';
import { BiInfoCircle } from 'react-icons/bi';

import { ButtonUI } from '@/components/UI/ButtonUI';
// import { InputUI } from '@/components/UI/InputUI';
// import { SelectUI } from '@/components/UI/SelectUI';

// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';

// import { BiSearch } from 'react-icons/bi';

const nameProject = 'Sistema de Autoavaliação';

const questions = [
  `1. Eu acho que gostaria de usar o ${nameProject} com frequência.*`,
  `2. Eu acho o ${nameProject} desnecessariamente complexo.*`,
  `3. Eu achei o ${nameProject} fácil de usar.*`,
  `4. Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o ${nameProject}.`,
  `5. Eu acho que as várias funções do ${nameProject} estão muito bem integradas.*`,
  `6. Eu acho que o ${nameProject} apresenta muita inconsistência (erros).*`,
  `7. Eu imagino que as pessoas aprenderão como usar o ${nameProject} rapidamente.`,
  `8. Eu achei o ${nameProject} atrapalhado de usar.*`,
  `9. Eu me senti confiante ao usar o ${nameProject}.*`,
  `10. Eu precisei aprender várias coisas novas antes de conseguir usar o ${nameProject}.`,
  `11. Deixa aqui sua sugestão de melhoria ou implementação:`,
];

// const defaultValues: { search: string; filter1: string; filter2: string } = {
//   search: '',
//   filter1: '',
//   filter2: '',
// };

// const schemaCreateFilterEvaluationArea = yup.object({
//   search: yup.string().required('Deve buscar por alguma turma!'),
//   filter1: yup
//     .string()
//     .when('search', {
//       is: (value: string) => value != '',
//       then: (schema) => schema.required('Necessário selecionar um valor!'),
//     })
//     .typeError('Valor inválido!'),
//   filter2: yup
//     .string()
//     .when('filter1', {
//       is: (value: string) => value != '',
//       then: (schema) => schema.required('Necessário selecionar um valor!'),
//     })
//     .typeError('Valor inválido!'),
// });

export const ProgramEvaluation = () => {
  const theme = useTheme();

  // const {
  //   handleSubmit,
  //   register,
  //   control,
  //   formState: { errors, isSubmitting },
  // } = useForm({
  //   defaultValues: defaultValues,
  //   resolver: yupResolver(schemaCreateFilterEvaluationArea),
  //   mode: 'all',
  // });

  // function onSubmit(values: any) {
  //   return new Promise((resolve: any) => {
  //     setTimeout(() => {
  //       alert(JSON.stringify(values, null, 2));
  //       resolve();
  //     }, 3000);
  //   });
  // }

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
          Avaliação do Programa
        </Badge>

        <Text
          fontSize="2.25rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="130%"
        >
          Avalie nosso sistema para que possamos entender as necessidades e
          percepção do usuário.
        </Text>

        <List spacing={3} color={theme.colorText}>
          <ListItem>
            <Center justifyContent="flex-start">
              <ListIcon
                as={BiInfoCircle}
                color={theme.colorSecundary800}
                fontSize="1.5rem"
              />
              Leia e marque a melhor opção nas perguntas levando em consideração
              sua experiencia na plataforma.
            </Center>
          </ListItem>
        </List>
      </VStack>

      <VStack
        alignItems="flex-start"
        justifyContent="flex-start"
        gap="3rem"
        h="100%"
        w="100%"
        m="auto"
      >
        {questions.map((question, index) => (
          <Card w="100%" p="1rem" key={`qst-${index}`}>
            <CardHeader>
              <Heading size="md">{question}</Heading>
            </CardHeader>

            <CardBody>
              <Stack>
                <Box m="auto" width="90%" p="2rem 1rem">
                  <Slider id="slider" defaultValue={0} min={0} max={4} step={1}>
                    <SliderMark value={0} mt="4" ml="-70" fontSize="sm">
                      Discordo Totalmente
                    </SliderMark>
                    <SliderMark value={1} mt="4" ml="-7" fontSize="sm">
                      Discordo
                    </SliderMark>
                    <SliderMark value={2} mt="4" ml="-7" fontSize="sm">
                      Neutro
                    </SliderMark>
                    <SliderMark value={3} mt="4" ml="-7" fontSize="sm">
                      Concordo
                    </SliderMark>
                    <SliderMark
                      value={4}
                      mt="4"
                      ml="-70"
                      fontSize="sm"
                      minW="15%"
                    >
                      Concordo Totalmente
                    </SliderMark>
                    <SliderTrack bg={theme.colorSecundary}>
                      <SliderFilledTrack bg={theme.colorPrimary} />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                  </Slider>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </VStack>

      <Box width="100%">
        <HStack gap="2rem" justifyContent="flex-end">
          <ButtonUI bg={theme.container500} color={theme.container200}>
            Enviar Avaliação
          </ButtonUI>
        </HStack>
      </Box>
    </VStack>
  );
};
