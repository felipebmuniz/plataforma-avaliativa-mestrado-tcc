import AdminLayout from '@/layouts/AdminLayout';
import { Badge, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { hexToRgb } from '@/utils/theme';
import { useTheme } from '@emotion/react';
import { FormsAdmin } from '@/components/sections/admin/FormsAdmin';
import { DrawerCreateForms } from '@/components/UI/drawers/DrawerCreateForms';

export default function AdminForms() {
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
            <Box>
              <DrawerCreateForms />
            </Box>
          </HStack>

          {/* <List spacing={3} color={theme.colorText}>
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
          </List> */}
        </VStack>
        <HStack gap="1.5rem" width="100%" flexWrap="wrap" margin="auto">
          <FormsAdmin />
        </HStack>
      </VStack>
    </AdminLayout>
  );
}
