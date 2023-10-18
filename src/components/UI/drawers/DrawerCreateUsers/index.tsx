import React from 'react';
import { useTheme } from '@emotion/react';
import {
  Box,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { ButtonUI } from '../../ButtonUI';
import { BiAddToQueue, BiEnvelope, BiUser } from 'react-icons/bi';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InputUI } from '../../InputUI';

const defaultValues: { name: string; email: string } = {
  name: '',
  email: '',
};

const schemaFormCreateUsers = yup.object({
  name: yup.string().required('Deve ser informado um nome!'),
  email: yup.string().email().required('Deve ser informado um email!'),
});

export const DrawerCreateUsers = () => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaFormCreateUsers),
    mode: 'onBlur',
  });

  const clearForm = () => {
    onClose();
    reset(defaultValues);
  };

  function onSubmit(values: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        clearForm();
        resolve();
      }, 3000);
    });
  }

  return (
    <>
      <ButtonUI
        leftIcon={<BiAddToQueue size="1.2rem" />}
        bg={theme.add}
        color={theme.colorTextAddButton}
        onClick={onOpen}
      >
        Adicionar
      </ButtonUI>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearForm} />
          <DrawerHeader borderBottomWidth="1px">
            Criar Novo Usuário
          </DrawerHeader>

          <DrawerBody>
            <Box
              as="form"
              id="my-form-create-users"
              onSubmit={handleSubmit(onSubmit)}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-start"
              gap="1rem"
            >
              <InputUI
                register={register}
                errors={errors}
                name="name"
                label="Nome"
                type="text"
                placeholder="Nome do Usuário *"
                icon={<BiUser />}
                iconPosition="left"
                ref={firstField}
              />
              <InputUI
                register={register}
                errors={errors}
                name="email"
                label="E-mail"
                type="email"
                placeholder="Senha de acesso *"
                icon={<BiEnvelope />}
                iconPosition="left"
              />
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <ButtonGroup size="sm" gap="1rem">
              <ButtonUI
                onClick={clearForm}
                transition={!isOpen ? 'inherit' : 'filter 0.3s ease'}
              >
                Cancelar
              </ButtonUI>
              <ButtonUI
                bg={theme.container500}
                color={theme.container200}
                transition={!isOpen ? 'inherit' : 'filter 0.3s ease'}
                type="submit"
                form="my-form-create-users"
                isLoading={isSubmitting}
              >
                Cadastrar
              </ButtonUI>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
