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
import { useClasses, useForms, useUsers } from "@/hooks";
import CheckboxUI from "../../CheckboUI";

const defaultValues: { students: string[] } = {
  students: [],
};

const schemaFormCreateForms = yup.object({
  students: yup
    .array()
    .min(1, "Deve ser informado ao menos Discente!")
    .required("Deve ser informado ao menos Discente!"),
});

export const DrawerCreateRelationUsers = ({ classId }: { classId: string }) => {
  const { relationClassesStudent } = useClasses();
  const { usersStudent, listUser } = useUsers();
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
    name: "students",
    control: control,
  });

  useEffect(() => {
    usersStudent.length <= 0 && listUser("student");
  }, [usersStudent.length, listUser]);

  const clearForm = () => {
    onClose();
    reset(defaultValues);
  };

  function onSubmit(values: { students: string[] }) {
    values.students.map((student) => {
      const aux = {
        classId: classId,
        studentId: student,
      };

      relationClassesStudent(aux, clearForm);
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
        Vincular Discentes
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
            Criar Relação do Discente com Turma
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
                  name="students"
                  label="Selecione os discentes a ser relacionados"
                  append={append}
                  remove={remove}
                  errors={errors}
                  control={control}
                >
                  {usersStudent?.map((value) => (
                    <Checkbox key={value.studentId} value={value.studentId}>
                      {value.name} - {value.studentCode}
                    </Checkbox>
                  ))}
                </CheckboxUI>
                {/* <CreateQuestion
                  fields={fields}
                  append={append}
                  remove={remove}
                  register={register}
                  watch={watch}
                  control={control}
                  errors={errors}
                  nameGroup="questions"
                /> */}
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
