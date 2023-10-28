import React from 'react';
import { useTheme } from '@emotion/react';
import {
  AbsoluteCenter,
  Box,
  ButtonGroup,
  Divider,
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
import { useFieldArray, useForm } from 'react-hook-form';
import { InputUI } from '../../InputUI';
import { EditableUI } from '../../EditableUI';
import { CreateQuestion } from '../../createQuestion';

interface IValueQuestions {
  statement: string;
  type: boolean;
  options: IValueOptions[];
  formId?: string;
}

interface IValueOptions {
  value: string;
  order: number;
  questionId?: string;
}

interface IValuesForm {
  title: string;
  questions: IValueQuestions[];
}

const defaultValues: IValuesForm = {
  title: '',
  questions: [
    { statement: '', type: false, options: [{ value: '', order: 0 }] },
  ],
};

const schemaFormCreateForms = yup.object({
  title: yup.string().required('Deve ser informado um título!'),
  questions: yup
    .array(
      yup.object({
        statement: yup.string().required('Deve ser informado uma pergunta!'),
        type: yup.boolean().required('Deve ser informado o tipo!'),
        options: yup
          .array(
            yup.object({
              value: yup.string().required('Deve ser informado a opção!'),
              order: yup.number().required('Deve ser informado a posição!'),
            }),
          )
          .required('Deve ser informado um Opção!'),
      }),
    )
    .required('Deve ser informado um Pergunta!'),
});

export const DrawerCreateForms = () => {
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
    resolver: yupResolver(schemaFormCreateForms),
    mode: 'all',
  });

  // const { fields , append, remove } = useFieldArray({
  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control,
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
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearForm} />
          <DrawerHeader borderBottomWidth="1px">
            Criar Novo Formulário
          </DrawerHeader>

          <DrawerBody py="2rem">
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
              <EditableUI
                register={register}
                errors={errors}
                name="title"
                label="Título"
                type="text"
                placeholder="Título do formulário *"
              />

              <Box position="relative" py="8" w="100%">
                <Divider />
                <AbsoluteCenter
                  bg="white"
                  px="1rem"
                  fontSize="1.2rem"
                  fontWeight="500"
                >
                  Perguntas
                </AbsoluteCenter>
              </Box>

              <Box
                w="100%"
                p="1rem"
                border="1px solid #c0c0c0a6"
                borderRadius="0.5rem"
              >
                <CreateQuestion
                  fields={fields}
                  append={append}
                  remove={remove}
                  register={register}
                  errors={errors}
                  nameGroup="questions"
                />
                {/* <Box position="relative" py="8" w="100%">
                  <Divider />
                  <AbsoluteCenter
                    bg="white"
                    px="1rem"
                    fontSize="1.2rem"
                    fontWeight="500"
                  >
                    Opções
                  </AbsoluteCenter>
                </Box> */}
              </Box>
              <Divider />
              <ButtonUI
                leftIcon={<BiAddToQueue size="1.2rem" />}
                bg={theme.add}
                color={theme.colorTextAddButton}
                onClick={() => {
                  append({
                    statement: '',
                    type: false,
                    options: [],
                  });
                }}
              >
                Pergunta
              </ButtonUI>
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
