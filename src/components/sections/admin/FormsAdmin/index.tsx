import { useEffect } from "react";

import { ButtonGroup, HStack, VStack } from "@chakra-ui/react";

import { ButtonUI } from "@/components/UI/ButtonUI";
import { InputUI } from "@/components/UI/InputUI";
import { SelectUI } from "@/components/UI/SelectUI";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { BiSearch } from "react-icons/bi";
import { SkeletonCards } from "@/components/UI/Skeleton";
import { DrawerCreateForms } from "@/components/UI/drawers/DrawerCreateForms";
import { useForms } from "@/hooks";
import { TableUI } from "@/components/UI/TableUI";
import ModalPreview from "@/components/UI/Modals/ModalPreview";
import PreviewForm from "@/components/preview/PreviewForm";
import ModalAlert from "@/components/UI/Modals/ModalAlert";
import ButtonSyncTableUI from "@/components/UI/ButtonSyncTableUI";

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

export const FormsAdmin = () => {
  const { forms, isLoading, listForms, deleteFormsByID } = useForms();

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
    forms.length <= 0 && listForms();
  }, [listForms, forms.length]);

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
            id="my-form-search-forms"
            isLoading={isSubmitting}
            type="submit"
          >
            Buscar
          </ButtonUI> */}
          <ButtonSyncTableUI onClick={listForms} />
          <DrawerCreateForms />
        </ButtonGroup>
      </HStack>
      {!isLoading ? (
        forms ? (
          <>
            {/* {forms.map((form) => (
              <p key={form.id}>{JSON.stringify(form, null, 2)}</p>
            ))} */}
            <TableUI
              data={forms.map((form) => {
                return {
                  ...form,
                  preview: (
                    <ModalPreview
                      label="Visualizar"
                      ModalTitle="Visualize como está o formulário!"
                      key={`modal-preview-${form.id}`}
                    >
                      <PreviewForm formId={form.id} />
                    </ModalPreview>
                  ),
                  options: (
                    <ModalAlert
                      ModalText="Certeza em realizar a ação de deletar Formulário?"
                      ModalTitle="Deletar Formulário"
                      ModalTextButtonConfirm="Deletar"
                      type="iconButtonDelete"
                      onChange={() => {
                        deleteFormsByID(form.id);
                      }}
                    />
                  ),
                };
              })}
              columns={["id", "name", "createdAt", "preview", "options"]}
              title="Formulários cadastrados"
            />
          </>
        ) : null
      ) : (
        <SkeletonCards />
      )}
    </VStack>
  );
};
