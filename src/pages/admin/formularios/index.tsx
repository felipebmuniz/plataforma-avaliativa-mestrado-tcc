import AdminLayout from "@/layouts/AdminLayout";
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
} from "@chakra-ui/react";
import { hexToRgb } from "@/utils/theme";
import { useTheme } from "@emotion/react";
import { FormsAdmin } from "@/components/sections/admin/FormsAdmin";
import { BiInfoCircle } from "react-icons/bi";
import { TabsUI } from "@/components/UI/TabsUI";
import { ITabs } from "@/types/tabs";
import { EvaluationsAdmin } from "@/components/sections/admin/EvaluationsAdmin";

const dataTabs: ITabs[] = [
  {
    label: "Área dos Formulários",
    content: <FormsAdmin />,
  },
  {
    label: "Área de Avaliações",
    content: <EvaluationsAdmin />,
  },
];

export default function AdminForms() {
  const theme = useTheme();
  return (
    <AdminLayout
      title="Administrativo - Turmas"
      description="Plataforma Autoavaliativa do Mestrado - UFC"
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
            p={"0.25rem 1.25rem"}
            borderRadius={"0.5rem"}
            bg={hexToRgb(theme.container200, 0.3)}
            fontSize="0.8125rem"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="150%"
            letterSpacing="0.13rem"
          >
            Criação de Formulários
          </Badge>

          <HStack
            w="100%"
            justifyContent="space-between"
            flexWrap="wrap"
            gap="2rem"
          >
            <Text
              fontSize="2.25rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="130%"
            >
              Crie, edite e busque pelos formulários da plataforma.
            </Text>
            <Box></Box>
          </HStack>

          <List spacing={3} color={theme.colorText}>
            <ListItem>
              <Center justifyContent="flex-start">
                <ListIcon
                  as={BiInfoCircle}
                  color={theme.colorSecundary800}
                  fontSize="1.5rem"
                />
                Os formulários são a base da plataforma, com eles podemos saber
                como se decorreu o funcionamento durante o semestre.
              </Center>
            </ListItem>
          </List>
        </VStack>
        <HStack gap="1.5rem" width="100%" flexWrap="wrap" margin="auto">
          <TabsUI data={dataTabs} />
        </HStack>
      </VStack>
    </AdminLayout>
  );
}
