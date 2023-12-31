import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { FormsContext } from "@/contexts";
import { formsServices } from "@/services/forms";
import {
  FormsResponse,
  ICreateOption,
  ICreateQuestion,
  IListFrom,
  IPutFrom,
  IValueOptions,
  IValueQuestions,
  IValuesForm,
} from "@/types/forms";
import { useToast } from "@chakra-ui/react";
import { questionsServices } from "@/services/questions";
import { optionsServices } from "@/services/options";
import { useRouter } from "next/router";

interface FormsProviderProps {
  children: ReactNode;
}

function FormsProvider({ children }: FormsProviderProps) {
  const toast = useToast();
  const router = useRouter();

  const [forms, setForms] = useState<IListFrom[]>([]);
  const [formByID, setFormByID] = useState<FormsResponse>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingShow, setIsLoadingShow] = useState<boolean>(false);

  const listForms = useCallback(async () => {
    setIsLoading(() => true);
    return formsServices()
      .list()
      .then((response) => {
        setIsLoading(() => false);
        setForms(() => response.data);
      })
      .catch(() => {
        setIsLoading(() => false);
        toast({
          status: "error",
          title: `Error ao buscar formulários :(`,
          position: "top-right",
          isClosable: true,
          variant: "left-accent",
        });
      });
  }, [toast]);

  const createOptions = useCallback(
    (options: IValueOptions[], questionId: string) => {
      options?.forEach((data, index) => {
        const auxData = {
          value: data.value,
          order: index,
          questionId: questionId,
        };
        return optionsServices()
          .create(auxData)
          .then((response) => {})
          .catch(({ response }) => {
            console.log("[error] =>", response.data);
            toast({
              status: "error",
              title: `Não foi possível criar a opção :(`,
              position: "top-right",
              isClosable: true,
              variant: "left-accent",
            });
          });
      });
      listForms();
    },
    [toast, listForms],
  );

  const createQuestions = useCallback(
    (questions: IValueQuestions[], formId: string) => {
      questions?.forEach((data) => {
        const auxData = {
          statement: data.statement,
          type: Number(data.type),
          formId: formId,
        };
        return questionsServices()
          .create(auxData)
          .then((response) => {
            response.data?.id &&
              createOptions(data?.options ?? [], response.data?.id);

            // toast({
            //   status: "success",
            //   title: `Pergunta criada com sucesso ✅`,
            //   position: "top-right",
            //   isClosable: true,
            //   variant: "left-accent",
            // });
          })
          .catch(({ response }) => {
            console.log("[error] =>", response.data);
            toast({
              status: "error",
              title: `Não foi possível criar a pergunta :(`,
              position: "top-right",
              isClosable: true,
              variant: "left-accent",
            });
          });
      });
    },
    [toast, createOptions],
  );

  const createForms = useCallback(
    (data: IValuesForm, clear: () => void) => {
      return formsServices()
        .create({ name: data.title })
        .then((response) => {
          response.data?.id &&
            createQuestions(data.questions, response.data?.id);
          clear();

          toast({
            status: "success",
            title: `Formulário criado com sucesso ✅`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        })
        .catch(({ response }) => {
          console.log("[error] =>", response.data);
          toast({
            status: "error",
            title:
              response?.data?.message ??
              `Não foi possível criar o Formulário :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, createQuestions],
  );

  const showFormsByID = useCallback(
    (id: string, accessToken?: string, redirect?: string) => {
      setIsLoadingShow(() => true);
      return formsServices()
        .show(id, accessToken)
        .then((response) => {
          setIsLoadingShow(() => false);
          setFormByID(() => response.data);
        })
        .catch(() => {
          setIsLoadingShow(() => false);
          toast({
            status: "error",
            title: `Error ao buscar formulário :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
          redirect && router.push(redirect);
        });
    },
    [toast, router],
  );

  const updateFormsByID = useCallback(
    (data: IPutFrom, clear?: () => void) => {
      formsServices()
        .update(data)
        .then((response) => {
          clear && clear();
          listForms();
          toast({
            status: "success",
            title: `Formulário atualizado com sucesso ✅`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        })
        .catch(({ response }) => {
          console.log("[error] =>", response.data);
          toast({
            status: "error",
            title:
              response?.data?.message ??
              `Não foi possível atualizar o Formulário :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listForms],
  );

  const deleteFormsByID = useCallback(
    async (id: string) => {
      return formsServices()
        .delete(id)
        .then((response) => {
          listForms();
          toast({
            status: "success",
            title: `Formulário deletado com sucesso ✅`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        })
        .catch(({ response }) => {
          console.log("[error] =>", response.data);
          toast({
            status: "error",
            title: response?.data?.message ?? `Error ao deletar formulário :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listForms],
  );

  const value = useMemo(() => {
    return {
      forms,
      formByID,
      isLoading,
      isLoadingShow,
      listForms,
      createForms,
      showFormsByID,
      updateFormsByID,
      deleteFormsByID,
    };
  }, [
    forms,
    formByID,
    isLoading,
    isLoadingShow,
    listForms,
    createForms,
    showFormsByID,
    updateFormsByID,
    deleteFormsByID,
  ]);

  return (
    <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
  );
}

export { FormsProvider };
