import { ProgramEvaluation } from '@/components/sections/ProgramEvaluation';
import { useAuth } from '@/hooks';
import PublicLayout from '@/layouts/PublicLayout';
import { hexToRgb } from '@/utils/theme';
import {
  Badge,
  Box,
  Center,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BiInfoCircle } from 'react-icons/bi';

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { validateUser } = useAuth();

  useEffect(() => {
    const valueToken = router.query?.token;

    valueToken && validateUser(String(valueToken));
  }, [router, validateUser]);

  return (
    <PublicLayout
      title="Plataforma Autoavaliativa Mestrado"
      description="Área de Validação da Plataforma Autoavaliativa do Mestrado - UFC"
      oculteMenu={true}
    >
      <VStack
        alignItems="center"
        justifyContent="center"
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
            Validação de Usuários
          </Badge>

          <Text
            fontSize="2.25rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="130%"
          >
            Espaço destinado a validação do usuário em nossa base de dados.
          </Text>

          <List spacing={3} color={theme.colorText}>
            <ListItem>
              <Center justifyContent="flex-start">
                <ListIcon
                  as={BiInfoCircle}
                  color={theme.colorSecundary800}
                  fontSize="1.5rem"
                />
                Espere pacientemente enquanto validamos seu usuário, assim que
                terminado você será redirecionado para a tela principal.
              </Center>
            </ListItem>
          </List>
        </VStack>
        <Stack w="100%" align={'center'}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
        {/* <VStack
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
      </VStack> */}
      </VStack>
    </PublicLayout>
  );
}
