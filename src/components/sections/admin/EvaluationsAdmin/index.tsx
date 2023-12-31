import { ButtonGroup, HStack, VStack } from "@chakra-ui/react";

import { ButtonUI } from "@/components/UI/ButtonUI";
import { InputUI } from "@/components/UI/InputUI";
import { SelectUI } from "@/components/UI/SelectUI";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { BiSearch } from "react-icons/bi";
import { SkeletonCards } from "@/components/UI/Skeleton";
import { DrawerCreateEvaluations } from "@/components/UI/drawers/DrawerCreateEvaluations";
import { useEvaluations } from "@/hooks";
import { useEffect } from "react";
import { TableUI } from "@/components/UI/TableUI";
import ModalPreview from "@/components/UI/Modals/ModalPreview";
import PreviewAnswers from "@/components/preview/PreviewAnswers";
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

export const EvaluationsAdmin = () => {
  const { evaluations, isLoading, listEvaluation, deleteEvaluation } =
    useEvaluations();

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
    evaluations.length <= 0 && listEvaluation();
  }, [evaluations.length, listEvaluation]);

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
          <ButtonSyncTableUI onClick={listEvaluation} />
          <DrawerCreateEvaluations />
        </ButtonGroup>
      </HStack>
      {!isLoading ? (
        evaluations.length > 0 ? (
          <>
            <TableUI
              data={evaluations.map((evaluation) => {
                return {
                  ...evaluation,
                  form: evaluation.form.id,
                  users: (
                    <ModalPreview
                      label="Visualizar"
                      ModalTitle="Visualize os usuários vinculados!"
                      key={`modal-preview-${evaluation.id}`}
                    >
                      <TableUI
                        data={evaluation.users}
                        columns={["id", "name", "email"]}
                        title="Usuários Vinculados"
                      />
                    </ModalPreview>
                  ),
                  answers: (
                    <ModalPreview
                      label="Visualizar"
                      ModalTitle="Visualize os usuários vinculados!"
                      key={`modal-preview-${evaluation.id}`}
                    >
                      <PreviewAnswers evaluationId={evaluation.id} />
                    </ModalPreview>
                  ),
                  options: (
                    <ModalAlert
                      ModalText="Certeza em realizar a ação de deletar Avaliação?"
                      ModalTitle="Deletar Avaliação"
                      ModalTextButtonConfirm="Deletar"
                      type="iconButtonDelete"
                      onChange={() => {
                        deleteEvaluation(evaluation.id);
                      }}
                    />
                  ),
                };
              })}
              columns={[
                "title",
                "startDate",
                "endDate",
                "form",
                "users",
                "answers",
                "options",
              ]}
              title="Avaliações cadastrados"
            />
          </>
        ) : null
      ) : (
        <SkeletonCards />
      )}
    </VStack>
  );
};
