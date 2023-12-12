import { useCallback, useEffect } from "react";
import { ButtonGroup, HStack, VStack } from "@chakra-ui/react";

import { ButtonUI } from "@/components/UI/ButtonUI";
import { InputUI } from "@/components/UI/InputUI";
import { SelectUI } from "@/components/UI/SelectUI";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { BiSearch } from "react-icons/bi";
import { SkeletonCards } from "@/components/UI/Skeleton";
import { useSubjects } from "@/hooks";
import { DrawerCreateSubjects } from "@/components/UI/drawers/DrawerCreateSubjects";
import { TableUI } from "@/components/UI/TableUI";
import ModalAlert from "@/components/UI/Modals/ModalAlert";

const defaultValues: { search: string; filter1: string; filter2: string } = {
  search: "",
  filter1: "",
  filter2: "",
};

const schemaCreateFilterEvaluationArea = yup.object({
  search: yup.string().required("Deve buscar por alguma turma!"),
  filter1: yup
    .string()
    .when("search", {
      is: (value: string) => value != "",
      then: (schema) => schema.required("Necessário selecionar um valor!"),
    })
    .typeError("Valor inválido!"),
  filter2: yup
    .string()
    .when("filter1", {
      is: (value: string) => value != "",
      then: (schema) => schema.required("Necessário selecionar um valor!"),
    })
    .typeError("Valor inválido!"),
});

export const SubjectsAdmin = () => {
  const { subjects, isLoading, listSubject, deleteSubject } = useSubjects();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaCreateFilterEvaluationArea),
    mode: "all",
  });

  useEffect(() => {
    subjects.length <= 0 && listSubject();
  }, [listSubject, subjects.length]);

  function onSubmit(values: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <VStack
      alignItems="flex-start"
      justifyContent="flex-start"
      gap="1.5rem"
      h="100%"
      w="100%"
    >
      <HStack
        as="form"
        id="my-form-search-forms-subjects"
        w="100%"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="2rem"
        marginTop="1.5rem"
      >
        <HStack w="100%" alignItems="flex-start">
          {/* <InputUI
            register={register}
            errors={errors}
            name="search"
            label="Turma"
            type="text"
            placeholder="Busque pelo nome da Turma"
            icon={<BiSearch />}
            iconPosition="right"
          />

          <SelectUI
            control={control}
            errors={errors}
            name="filter1"
            label="Turma"
            placeholder="Busque pelo nome da Turma"
          />

          <SelectUI
            control={control}
            errors={errors}
            name="filter2"
            label="Turma"
            placeholder="Busque pelo nome da Turma"
          /> */}
        </HStack>

        <ButtonGroup gap="1rem" margin="auto" marginTop="2rem" height="inherit">
          {/* <ButtonUI
            id="my-form-search-forms-subjects"
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Buscar
          </ButtonUI> */}
          <DrawerCreateSubjects />
        </ButtonGroup>
      </HStack>
      {!isLoading ? (
        subjects ? (
          <>
            <TableUI
              data={subjects.map((subject) => {
                return {
                  ...subject,
                  options: (
                    <ModalAlert
                      ModalText="Certeza em realizar a ação de deletar Disciplina?"
                      ModalTitle="Deletar Disciplina"
                      ModalTextButtonConfirm="Deletar"
                      type="iconButtonDelete"
                      onChange={() => {
                        deleteSubject(subject.id);
                      }}
                    />
                  ),
                };
              })}
              columns={["code", "name", "createdAt", "options"]}
              title="Disciplinas cadastrados"
            />
          </>
        ) : null
      ) : (
        <SkeletonCards />
      )}
    </VStack>
  );
};
