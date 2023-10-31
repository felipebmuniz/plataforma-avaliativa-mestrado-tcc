import { useEffect, useCallback, useState } from 'react';
import {
  AbsoluteCenter,
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { EditableUIQuestion } from '../EditableUIQuestion';
import ModalAlert from '../Modals/ModalAlert';
import { CreateOptionRadio } from '../createOptionRadio';

import { useFieldArray } from 'react-hook-form';

type CreateQuestionProps = {
  nameGroup: string;
  fields: any;
  append: any;
  remove: any;
  errors: any;
  register?: any;
  watch?: any;
  control?: any;
};

export function CreateQuestion({
  nameGroup,
  fields,
  append,
  remove,
  errors,
  register,
  watch,
  control,
}: CreateQuestionProps) {
  const toast = useToast();

  const [valueSwitchTypeQuestion, setValueSwitchTypeQuestion] = useState(false);

  useEffect(() => {
    console.log('[fields] =>', fields);
    console.log('[erros] =>', errors);
  }, [fields, errors]);

  return (
    <>
      {fields.map((field: any, index: any) => {
        return (
          <VStack width="100%" key={field.id} position="relative" py="1rem">
            <ModalAlert
              key={`modal-${field.id}`}
              type="iconButtonClose"
              ModalTitle="Excluir Pergunta!"
              ModalText="Realmente deseja excluir essa pergunta? os dados serão perdidos."
              ModalTextButtonConfirm="Excluir"
              onChange={() => {
                if (fields.length > 1) {
                  remove(index);
                } else {
                  toast({
                    status: 'warning',
                    title: `Formulário deve ter ao menos uma pergunta!`,
                    position: 'top',
                    isClosable: true,
                    variant: 'left-accent',
                  });
                }
              }}
              configButton={{
                position: 'absolute',
                top: '2rem',
                right: '1rem',
                zIndex: '10',
              }}
            />
            <Box
              w="100%"
              p="1rem"
              py="2rem"
              border="1px solid #c0c0c0a6"
              borderRadius="0.5rem"
            >
              <EditableUIQuestion
                nameGroup={nameGroup}
                index={index}
                field={field}
                append={append}
                remove={remove}
                register={register}
                errors={errors?.[nameGroup]?.[index]?.['statement']}
                name={'statement'}
                label="Pergunta"
                placeholder="Título da pergunta ⚡️"
              />
              <FormControl
                display="flex"
                alignItems="center"
                py="0.5rem"
                isInvalid={errors?.[nameGroup]?.[index]?.['type']}
                key={`form-${field.id}`}
              >
                <FormLabel
                  htmlFor={`${nameGroup}.${index}.${'type'}`}
                  mb="0"
                  fontSize="0.9rem"
                  cursor="pointer"
                >
                  Pergunta discursiva?
                </FormLabel>
                <Switch
                  id={`${nameGroup}.${index}.${'type'}`}
                  {...register(`${nameGroup}.${index}.${'type'}`)}
                  name={`${nameGroup}.${index}.${'type'}`}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors?.[nameGroup]?.[index]?.['type'] &&
                    errors?.[nameGroup]?.[index]?.['type'].message}
                </FormErrorMessage>
              </FormControl>

              <CreateOptionRadio
                key={`group-form-options-${field.id}`}
                indexGroup={index}
                errors={errors}
                name={'options'}
                nameGroup={nameGroup}
                watch={watch}
              />
            </Box>
          </VStack>
        );
      })}
    </>
  );
}
