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
  useDisclosure,
} from '@chakra-ui/react';
import { ButtonUI } from '../../ButtonUI';
import { BiAddToQueue, BiUser, BiCodeCurly } from 'react-icons/bi';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InputUI } from '../../InputUI';
import { useSubjects } from '@/hooks';
import { subjectsCreate } from '@/types/subjects';

const defaultValues: subjectsCreate = {
  name: '',
  code: '',
};

const schemaFormCreateSubjects = yup.object({
  name: yup.string().required('Deve ser informado um nome!'),
  code: yup.string().required('Deve ser informado um código!'),
});

export const DrawerCreateSubjects = () => {
  const { createSubject } = useSubjects();
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaFormCreateSubjects),
    mode: 'onBlur',
  });

  const clearForm = () => {
    onClose();
    reset(defaultValues);
  };

  function onSubmit(values: subjectsCreate) {
    return createSubject(values, clearForm);
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
            Criar Nova Disciplina
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
                placeholder="Nome da Disciplina *"
                icon={<BiUser />}
                iconPosition="left"
                ref={firstField}
              />
              <InputUI
                register={register}
                errors={errors}
                name="code"
                label="Código"
                type="text"
                placeholder="Código da Disciplina *"
                icon={<BiCodeCurly />}
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
