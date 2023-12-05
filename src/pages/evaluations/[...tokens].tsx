import { ProgramEvaluation } from "@/components/sections/ProgramEvaluation";
import { useAuth } from "@/hooks";
import PublicLayout from "@/layouts/PublicLayout";
import { hexToRgb } from "@/utils/theme";
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
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BiInfoCircle } from "react-icons/bi";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { ValidateEvaluation } = useAuth();

  useEffect(() => {
    const valueTokens = router.query?.tokens;
    // console.log("[valueTokens] =>", valueTokens);

    valueTokens &&
      valueTokens?.length > 0 &&
      ValidateEvaluation(String(valueTokens[0]), String(valueTokens[2]));
  }, [router, ValidateEvaluation]);

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
            p={"0.25rem 1.25rem"}
            borderRadius={"0.5rem"}
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
            Espaço destinado a validação da relação do usuário com a avaliação
            em nossa base de dados.
          </Text>

          <List spacing={3} color={theme.colorText}>
            <ListItem>
              <Center justifyContent="flex-start">
                <ListIcon
                  as={BiInfoCircle}
                  color={theme.colorSecundary800}
                  fontSize="1.5rem"
                />
                Espere pacientemente enquanto validamos a relação seu usuário
                com a avaliação, assim que terminado você será redirecionado
                para o formulário da avaliação.
              </Center>
            </ListItem>
          </List>
        </VStack>
        <Stack w="100%" align={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      </VStack>
    </PublicLayout>
  );
}
