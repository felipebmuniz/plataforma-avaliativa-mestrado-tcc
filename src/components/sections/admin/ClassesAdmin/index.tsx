import { ButtonGroup, HStack, VStack } from "@chakra-ui/react";

import { ButtonUI } from "@/components/UI/ButtonUI";
import { InputUI } from "@/components/UI/InputUI";
import { SelectUI } from "@/components/UI/SelectUI";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { BiSearch } from "react-icons/bi";
import { SkeletonCards } from "@/components/UI/Skeleton";
import { useClasses } from "@/hooks";
import { useEffect } from "react";
import { DrawerCreateClasses } from "@/components/UI/drawers/DrawerCreateClasses";
import { TableUI } from "@/components/UI/TableUI";

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

export const ClassesAdmin = () => {
  const { classes, isLoading, listClasses } = useClasses();

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
    classes.length <= 0 && listClasses();
  }, [listClasses, classes.length]);

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
        id="my-form-search-forms"
        onSubmit={handleSubmit(onSubmit)}
        w="100%"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="2rem"
        marginTop="1.5rem"
      >
        <HStack w="100%" alignItems="flex-start">
          <InputUI
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
          />
        </HStack>

        <ButtonGroup gap="1rem" margin="auto" marginTop="2rem" height="inherit">
          <ButtonUI
            id="my-form-search-forms"
            isLoading={isSubmitting}
            type="submit"
          >
            Buscar
          </ButtonUI>
          <DrawerCreateClasses />
        </ButtonGroup>
      </HStack>
      {!isLoading ? (
        classes ? (
          <>
            <TableUI
              data={classes.map((classe) => {
                return {
                  ...classe,
                  subject: classe.subject.code,
                  teacher: classe.teacher.teacherCode,
                };
              })}
              columns={["code", "year", "subject", "teacher", "createdAt"]}
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
