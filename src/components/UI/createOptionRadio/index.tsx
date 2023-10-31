import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useTheme } from '@emotion/react';
import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { EditableUIQuestion } from '../EditableUIQuestion';
import ModalAlert from '../Modals/ModalAlert';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { ButtonUI } from '../ButtonUI';
import { BiAddToQueue } from 'react-icons/bi';

type CreateOptionRadioProps = {
  name: string;
  nameGroup: string;
  errors: any;
  indexGroup: number;
  watch: any;
};

export function CreateOptionRadio({
  name,
  nameGroup,
  errors,
  indexGroup,
  watch,
}: CreateOptionRadioProps) {
  const theme = useTheme();
  const toast = useToast();

  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `${nameGroup}.${indexGroup}.${'options'}`,
    control,
  });

  const checkTypeQuestion = useCallback(
    (name: string) => {
      const valueWatch = watch(name);
      return valueWatch;
    },
    [watch],
  );

  const validateRender = (checkType: boolean) => {
    if (!checkType) {
      fields.length < 1 && append({ value: '' });
      return (
        <VStack px="2rem" key={`group-${indexGroup}-options`}>
          <Box position="relative" py="8" w="100%">
            <Divider />
            <AbsoluteCenter
              bg="white"
              px="1rem"
              fontSize="1.2rem"
              fontWeight="500"
            >
              Opções
            </AbsoluteCenter>
          </Box>
          {fields.map((field: any, index: any) => {
            return (
              <VStack width="100%" key={field.id} position="relative" py="1rem">
                <ModalAlert
                  key={`modal-${field.id}`}
                  type="iconButtonClose"
                  ModalTitle="Excluir Opção!"
                  ModalText="Realmente deseja excluir essa Opção? os dados serão perdidos."
                  ModalTextButtonConfirm="Excluir"
                  onChange={() => {
                    if (fields.length > 1) {
                      remove(index);
                    } else {
                      toast({
                        status: 'warning',
                        title: `Pergunta deve ter ao menos uma Opção!`,
                        position: 'top',
                        isClosable: true,
                        variant: 'left-accent',
                      });
                    }
                  }}
                  configButton={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '-0.5rem',
                    zIndex: '10',
                  }}
                />
                <EditableUIQuestion
                  nameGroup={`${nameGroup}.${indexGroup}.${name}`}
                  index={index}
                  field={field}
                  register={register}
                  errors={
                    errors?.[nameGroup]?.[indexGroup]?.[name]?.[index]?.value
                  }
                  name="value"
                  label="Opção"
                  placeholder="Título da Opção ⚡️"
                />

                <Center py="1rem" width="100%">
                  <Divider />
                </Center>
              </VStack>
            );
          })}
          <ButtonUI
            leftIcon={<BiAddToQueue size="1.2rem" />}
            bg={theme.add}
            color={theme.colorTextAddButton}
            onClick={() => {
              append({
                value: '',
              });
            }}
          >
            Opção
          </ButtonUI>
        </VStack>
      );
    } else {
      fields.length > 0 && remove();
      return null;
    }
  };

  return (
    <>
      {validateRender(
        checkTypeQuestion(`${nameGroup}.${indexGroup}.${'type'}`),
      )}
    </>
  );
}
