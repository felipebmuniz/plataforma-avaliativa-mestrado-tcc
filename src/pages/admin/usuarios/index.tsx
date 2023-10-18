import AdminLayout from '@/layouts/AdminLayout';
import { UsersAdmin } from '@/components/sections/UsersAdmin';
import {
  Badge,
  Center,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TabsUI } from '@/components/UI/TabsUI';
import { ITabs } from '@/types/tabs';
import { hexToRgb } from '@/utils/theme';
import { useTheme } from '@emotion/react';
import { BiInfoCircle } from 'react-icons/bi';

const dataTabs: ITabs[] = [
  {
    label: 'Usuário Discente',
    content: <UsersAdmin />,
  },
  {
    label: 'Usuário Docente',
    content: <UsersAdmin />,
  },
];

export default function AdminUsers() {
  const theme = useTheme();
  return (
    <AdminLayout
      title="Administrativo - Usuários"
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
            p={'0.25rem 1.25rem'}
            borderRadius={'0.5rem'}
            bg={hexToRgb(theme.container200, 0.3)}
            fontSize="0.8125rem"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="150%"
            letterSpacing="0.13rem"
          >
            Criação de Usuários
          </Badge>

          <Text
            fontSize="2.25rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="130%"
          >
            Crie, edite e busque pelos usuários da plataforma.
          </Text>

          <List spacing={3} color={theme.colorText}>
            <ListItem>
              <Center justifyContent="flex-start">
                <ListIcon
                  as={BiInfoCircle}
                  color={theme.colorSecundary800}
                  fontSize="1.5rem"
                />
                Selecione o tipo de usuário que deseja visualizar, modificar e
                criar.
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
