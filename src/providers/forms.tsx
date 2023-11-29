import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { FormsContext } from "@/contexts";
import { formsServices } from "@/services/forms";
import { FormsResponse, IListFrom, IPutFrom } from "@/types/forms";
import { useToast } from "@chakra-ui/react";

interface FormsProviderProps {
  children: ReactNode;
}

function FormsProvider({ children }: FormsProviderProps) {
  const toast = useToast();

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

  const createForms = useCallback(
    (name: string, clear: () => void) => {
      return formsServices()
        .create({ name })
        .then((response) => {
          clear();
          listForms();
          toast({
            status: "success",
            title: `Formulário criado com sucesso ✅`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        })
        .catch((error) => {
          toast({
            status: "error",
            title: `Não foi possível criar o Formulário :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listForms],
  );

  const showFormsByID = useCallback(
    (id: string) => {
      setIsLoadingShow(() => true);
      return formsServices()
        .show(id)
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
        });
    },
    [toast],
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
        .catch((error) => {
          toast({
            status: "error",
            title: `Não foi possível atualizar o Formulário :(`,
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
  ]);

  return (
    <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
  );
}

export { FormsProvider };
