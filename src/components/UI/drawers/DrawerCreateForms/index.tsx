import React, { useEffect } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { ButtonUI } from '../../ButtonUI';
import { BiAddToQueue, BiEnvelope, BiUser } from 'react-icons/bi';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import { EditableUI } from '../../EditableUI';
import { CreateQuestion } from '../../createQuestion';

interface IValueQuestions {
  statement: string;
  type: boolean;
  options?: IValueOptions[];
  formId?: string;
}

interface IValueOptions {
  value: string;
  order?: number;
  questionId?: string;
}

interface IValuesForm {
  title: string;
  questions: IValueQuestions[];
}

const defaultValues: IValuesForm = {
  title: '',
  questions: [
    {
      statement: '',
      type: false,
      options: [
        {
          value: '',
        },
      ],
    },
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
              // .when('type', {
              //   is: (value: boolean) => value == false,
              //   then: (schema) =>
              //     schema.required('Deve ser informado a opção!'),
              // }),
              order: yup.number(),
            }),
          )
          .when('type', {
            is: (value: boolean) => value == false,
            then: (schema) =>
              schema.min(1, 'Deve ser informado uma Opção!').required(),
          }),
      }),
    )
    .required('Deve ser informado um Pergunta!'),
});

export const DrawerCreateForms = () => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaFormCreateForms),
    mode: 'all',
  });

  const {
    register,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control: control,
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

  useEffect(() => {
    console.log('[fields] =>', fields);
  }, [fields]);

  return (
    <>
      <ButtonUI
        leftIcon={<BiAddToQueue size="1.2rem" />}
        bg={theme.add}
        color={theme.colorTextAddButton}
        onClick={onOpen}
      >
        Adicionar Formulário
      </ButtonUI>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={clearForm}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={clearForm} />
          <DrawerHeader borderBottomWidth="1px">
            Criar Novo Formulário
          </DrawerHeader>

          <DrawerBody py="2rem">
            <FormProvider {...methods}>
              <Box
                as="form"
                id="my-form-create-forms"
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
                  placeholder="Título do formulário ⚡️"
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

                <CreateQuestion
                  fields={fields}
                  append={append}
                  remove={remove}
                  register={register}
                  watch={watch}
                  control={control}
                  errors={errors}
                  nameGroup="questions"
                />

                <Divider py="1rem" />
                <ButtonUI
                  leftIcon={<BiAddToQueue size="1.2rem" />}
                  bg={theme.add}
                  color={theme.colorTextAddButton}
                  onClick={() => {
                    append({
                      statement: '',
                      type: false,
                      options: [{ value: '' }],
                    });
                  }}
                >
                  Pergunta
                </ButtonUI>
              </Box>
            </FormProvider>
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
                form="my-form-create-forms"
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
