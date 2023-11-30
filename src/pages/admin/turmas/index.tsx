import AdminLayout from "@/layouts/AdminLayout";
import { ClassesAdmin } from "@/components/sections/admin/ClassesAdmin";
import {
  Badge,
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
import { BiInfoCircle } from "react-icons/bi";
import { ITabs } from "@/types/tabs";
import { SubjectsAdmin } from "@/components/sections/admin/SubjectsAdmin";
import { TabsUI } from "@/components/UI/TabsUI";

const dataTabs: ITabs[] = [
  {
    label: "Área de Disciplinas",
    content: <SubjectsAdmin />,
  },
  {
    label: "Área de Turmas",
    content: <ClassesAdmin />,
  },
];

export default function AdminTurmas() {
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
            Criação de Turmas e Disciplinas
          </Badge>

          <Text
            fontSize="2.25rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="130%"
          >
            Crie, edite e busque pelas Turmas e Disciplinas da plataforma.
          </Text>

          <List spacing={3} color={theme.colorText}>
            <ListItem>
              <Center justifyContent="flex-start">
                <ListIcon
                  as={BiInfoCircle}
                  color={theme.colorSecundary800}
                  fontSize="1.5rem"
                />
                As turmas e disciplinas são essenciais para o funcionamento da
                plataforma. Com elas são possíveis vincular discentes e docentes
                para responder os formulários.
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
