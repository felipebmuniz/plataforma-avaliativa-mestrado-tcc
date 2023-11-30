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
import {
  BiAddToQueue,
  BiCalendarPlus,
  BiCalendarMinus,
  BiBulb,
} from "react-icons/bi";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InputUI } from "../../InputUI";
import { useEvaluations, useForms } from "@/hooks";
import { SelectUI } from "../../SelectUI";
import { evaluationsCreate } from "@/types/evaluations";

const defaultValues: evaluationsCreate = {
  title: "",
  startDate: "",
  endDate: "",
  formId: "",
};

const schemaFormCreateClasses = yup.object({
  title: yup.string().required("Deve ser informado um título!"),
  startDate: yup.string().required("Deve ser informado uma data de começo!"),
  endDate: yup.string().required("Deve ser informado uma data de fim!"),
  formId: yup.string().required("Deve ser informado um código de Formulário!"),
});

export const DrawerCreateEvaluations = () => {
  const { createEvaluation } = useEvaluations();
  const { forms } = useForms();

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

  function onSubmit(values: evaluationsCreate) {
    return createEvaluation(values, clearForm);
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
            Criar Nova Avaliação
          </DrawerHeader>

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
                name="title"
                label="Título"
                type="text"
                placeholder="Título da Avaliação *"
                icon={<BiBulb />}
                iconPosition="left"
                ref={firstField}
              />
              <InputUI
                register={register}
                errors={errors}
                name="startDate"
                label="Início"
                type="datetime-local"
                placeholder="Data de Início da Avaliação *"
                icon={<BiCalendarPlus />}
                iconPosition="left"
                ref={firstField}
              />
              <InputUI
                register={register}
                errors={errors}
                name="endDate"
                label="Termino"
                type="datetime-local"
                placeholder="Data de Termino da Avaliação *"
                icon={<BiCalendarMinus />}
                iconPosition="left"
                ref={firstField}
              />

              <SelectUI
                control={control}
                errors={errors}
                name="formId"
                label="Formulário"
                placeholder="Formulário da Avaliação"
                data={forms}
                indexObjectLabel="name"
                indexObjectValue="id"
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
