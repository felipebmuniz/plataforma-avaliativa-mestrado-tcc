import { useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import {
  AbsoluteCenter,
  Box,
  ButtonGroup,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { ButtonUI } from "../../ButtonUI";
import { BiAddToQueue, BiEnvelope, BiUser } from "react-icons/bi";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { EditableUI } from "../../EditableUI";
import { CreateQuestion } from "../../createQuestion";
import { IValuesForm } from "@/types/forms";
import { useClasses, useEvaluations } from "@/hooks";
import CheckboxUI from "../../CheckboUI";

const defaultValues: { evaluations: string[] } = {
  evaluations: [],
};

const schemaFormCreateForms = yup.object({
  evaluations: yup
    .array()
    .min(1, "Deve ser informado uma Avaliação!")
    .max(1, "Deve ser informado somente uma Avaliação!")
    .required("Deve ser informado ao menos Discente!"),
});

export const DrawerRelationUsersEvaluation = ({
  classId,
}: {
  classId: string;
}) => {
  const { relationEvaluationStudent } = useClasses();
  const { evaluations, listEvaluation } = useEvaluations();
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLInputElement>(null);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaFormCreateForms),
    mode: "all",
  });

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const { append, remove } = useFieldArray({
    name: "evaluations",
    control: control,
  });

  useEffect(() => {
    evaluations.length <= 0 && listEvaluation();
  }, []);

  const clearForm = () => {
    onClose();
    reset(defaultValues);
  };

  function onSubmit(values: { evaluations: string[] }) {
    values.evaluations.map((evaluation) => {
      const aux = {
        classId: classId,
        evaluationId: evaluation,
      };

      relationEvaluationStudent(aux, clearForm);
    });
  }

  return (
    <>
      <MenuItem
        height={"3rem"}
        icon={
          <BiAddToQueue color={theme.colorSecundary800} fontSize="1.2rem" />
        }
        onClick={onOpen}
      >
        Vincular Avaliação para os Discentes
      </MenuItem>

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
            Criar Relação da Turma de Discentes com a Avaliação
          </DrawerHeader>

          <DrawerBody py="2rem">
            <FormProvider {...methods}>
              <Box
                as="form"
                id="my-form-create-forms"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                gap="1rem"
              >
                <CheckboxUI
                  name="evaluations"
                  label="Selecione a avaliação a ser relacionada"
                  append={append}
                  remove={remove}
                  errors={errors}
                  control={control}
                >
                  {evaluations?.map((value) => (
                    <Checkbox key={value.id} value={value.id}>
                      {value.title}
                    </Checkbox>
                  ))}
                </CheckboxUI>
              </Box>
            </FormProvider>
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
                form="my-form-create-forms"
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
