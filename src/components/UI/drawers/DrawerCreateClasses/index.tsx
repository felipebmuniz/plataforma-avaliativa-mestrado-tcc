import React from "react";
import { useTheme } from "@emotion/react";
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
} from "@chakra-ui/react";
import { ButtonUI } from "../../ButtonUI";
import { BiAddToQueue, BiUser, BiCodeCurly } from "react-icons/bi";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InputUI } from "../../InputUI";
import { useClasses, useSubjects, useUsers } from "@/hooks";
import { classesCreate } from "@/types/classes";
import { SelectUI } from "../../SelectUI";

const yearActual = Number(
  new Date().toLocaleDateString("pt-br", {
    year: "numeric",
  }),
);

const defaultValues: classesCreate = {
  code: "",
  open: true,
  period: 1,
  year: yearActual,
  subjectId: "",
  teacherId: "",
};

const schemaFormCreateClasses = yup.object({
  code: yup.string().required("Deve ser informado um código!"),
  period: yup.number().min(1).required("Deve ser informado um período!"),
  year: yup
    .number()
    .min(yearActual)
    .max(yearActual)
    .required("Deve ser informado o ano em vigência!"),
  open: yup
    .boolean()
    .required("Deve ser informado o se a turma o estado da Turma!"),
  subjectId: yup
    .string()
    .required("Deve ser informado um código de Disciplina!"),
  teacherId: yup
    .string()
    .required("Deve ser informado um código de Professor!"),
});

export const DrawerCreateClasses = () => {
  const { createClasses } = useClasses();
  const { usersTeacher } = useUsers();
  const { subjects } = useSubjects();
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
    resolver: yupResolver(schemaFormCreateClasses),
    mode: "onBlur",
  });

  const clearForm = () => {
    onClose();
    reset(defaultValues);
  };

  function onSubmit(values: classesCreate) {
    return createClasses(values, clearForm);
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
          <DrawerHeader borderBottomWidth="1px">Criar Nova Turma</DrawerHeader>

          <DrawerBody>
            <Box
              as="form"
              id="my-form-create-classes"
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
                name="code"
                label="Código"
                type="text"
                placeholder="Código da Turma *"
                icon={<BiCodeCurly />}
                iconPosition="left"
                ref={firstField}
              />
              <SelectUI
                control={control}
                errors={errors}
                name="period"
                label="Período"
                placeholder="Período da Turma"
                data={[{ labelOption: "Integral", value: "1" }]}
              />
              <SelectUI
                control={control}
                errors={errors}
                name="year"
                label="Ano"
                placeholder="Ano da Turma"
                data={[{ labelOption: yearActual, value: yearActual }]}
              />
              <SelectUI
                control={control}
                errors={errors}
                name="open"
                label="Estado"
                placeholder="Estado da Turma"
                data={[
                  { labelOption: "Aberta", value: true },
                  { labelOption: "Encerrada", value: false },
                ]}
              />
              <SelectUI
                control={control}
                errors={errors}
                name="subjectId"
                label="Disciplina"
                placeholder="Disciplina da Turma"
                data={subjects}
                indexObjectLabel="name"
                indexObjectValue="id"
              />
              <SelectUI
                control={control}
                errors={errors}
                name="teacherId"
                label="Professor"
                placeholder="Professor da Turma"
                data={usersTeacher.filter((teacher) => teacher.validated)}
                indexObjectLabel="name"
                indexObjectValue="teacherId"
              />
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <ButtonGroup size="sm" gap="1rem">
              <ButtonUI
                onClick={clearForm}
                transition={!isOpen ? "inherit" : "filter 0.3s ease"}
              >
                Cancelar
              </ButtonUI>
              <ButtonUI
                bg={theme.container500}
                color={theme.container200}
                transition={!isOpen ? "inherit" : "filter 0.3s ease"}
                type="submit"
                form="my-form-create-classes"
                isLoading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
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
