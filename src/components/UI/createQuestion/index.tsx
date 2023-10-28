import { useEffect } from 'react';
import {
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
  VStack,
} from '@chakra-ui/react';

import { useTheme } from '@emotion/react';
import { EditableUIQuestion } from '../EditableUIQuestion';
import ModalAlert from '../Modals/ModalAlert';

type CreateQuestionProps = {
  nameGroup: string;
  register: any;
  errors: any;
  fields: any;
  append: any;
  remove: any;
};

export function CreateQuestion({
  nameGroup,
  fields,
  append,
  remove,
  register,
  errors,
}: CreateQuestionProps) {
  const theme = useTheme();

  useEffect(() => {
    console.log('[fields] =>', fields);
  }, [fields]);

  return (
    <>
      {fields.map((field: any, index: any) => {
        return (
          <VStack width="100%" key={field.id} position="relative" py="1rem">
            <ModalAlert
              key={field.id}
              type="iconButtonClose"
              ModalTitle="Excluir Pergunta!"
              ModalText="Realmente deseja excluir essa pergunta? os dados serão perdidos."
              ModalTextButtonConfirm="Excluir"
              onChange={() => {
                remove(index);
              }}
              configButton={{
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                zIndex: '10',
              }}
            />
            <EditableUIQuestion
              nameGroup={nameGroup}
              index={index}
              field={field}
              append={append}
              remove={remove}
              register={register}
              errors={errors}
              name="statement"
              label="Pergunta"
              placeholder="Título da pergunta *"
            />
            <FormControl
              display="flex"
              alignItems="center"
              py="0.5rem"
              isInvalid={errors?.[nameGroup]?.[index]?.['type']}
              key={field.id}
            >
              <FormLabel
                htmlFor={`${nameGroup}.${index}.${'type'}`}
                mb="0"
                fontSize="0.9rem"
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
            <Center py="1rem" width="100%">
              <Divider />
            </Center>
          </VStack>
        );
      })}
    </>
  );
}
