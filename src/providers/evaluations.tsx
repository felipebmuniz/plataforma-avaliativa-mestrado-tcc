import { ReactNode, useCallback, useMemo, useState } from "react";
import { EvaluationsContext } from "@/contexts";
import { useToast } from "@chakra-ui/react";
import { evaluationsCreate, evaluationsList } from "@/types/evaluations";
import { evaluationsServices } from "@/services/evaluations";

interface IEvaluationsProviderProps {
  children: ReactNode;
}

function EvaluationsProvider({ children }: IEvaluationsProviderProps) {
  const toast = useToast();

  const [evaluations, setEvaluations] = useState<evaluationsList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const listEvaluation = useCallback(async () => {
    setIsLoading(() => true);
    return evaluationsServices()
      .list()
      .then((response) => {
        setIsLoading(() => false);
        setEvaluations(() => response.data);
      })
      .catch(() => {
        setIsLoading(() => false);
        toast({
          status: "error",
          title: `Error ao buscar avaliações :(`,
          position: "top-right",
          isClosable: true,
          variant: "left-accent",
        });
      });
  }, [toast]);

  const createEvaluation = useCallback(
    async (data: evaluationsCreate, clear: () => void) => {
      return evaluationsServices()
        .create(data)
        .then((response) => {
          clear();
          listEvaluation();
          toast({
            status: "success",
            title: `Avaliação criado com sucesso ✅`,
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
              `Não foi possível criar o Avaliação :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listEvaluation],
  );

  const deleteEvaluation = useCallback(
    async (id: string) => {
      return evaluationsServices()
        .delete(id)
        .then((response) => {
          listEvaluation();
          toast({
            status: "success",
            title: `Avaliação deletada com sucesso ✅`,
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
              `Não foi possível deletar a Avaliação :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listEvaluation],
  );

  const value = useMemo(() => {
    return {
      evaluations,
      isLoading,
      createEvaluation,
      listEvaluation,
      deleteEvaluation,
    };
  }, [
    evaluations,
    isLoading,
    createEvaluation,
    listEvaluation,
    deleteEvaluation,
  ]);

  return (
    <EvaluationsContext.Provider value={value}>
      {children}
    </EvaluationsContext.Provider>
  );
}

export { EvaluationsProvider };
