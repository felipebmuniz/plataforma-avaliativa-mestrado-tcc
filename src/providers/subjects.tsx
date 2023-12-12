import { ReactNode, useCallback, useMemo, useState } from "react";
import { SubjectsContext } from "@/contexts";
import { useToast } from "@chakra-ui/react";
import { subjectsCreate, subjectsList } from "@/types/subjects";
import { subjectsServices } from "@/services/subjects";

interface ISubjectsProviderProps {
  children: ReactNode;
}

function SubjectsProvider({ children }: ISubjectsProviderProps) {
  const toast = useToast();

  const [subjects, setSubjects] = useState<subjectsList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const listSubject = useCallback(async () => {
    setIsLoading(() => true);
    return subjectsServices()
      .list()
      .then((response) => {
        setIsLoading(() => false);
        setSubjects(() => response.data);
      })
      .catch(() => {
        setIsLoading(() => false);
        toast({
          status: "error",
          title: `Error ao buscar disciplinas :(`,
          position: "top-right",
          isClosable: true,
          variant: "left-accent",
        });
      });
  }, [toast]);

  const createSubject = useCallback(
    async (data: subjectsCreate, clear: () => void) => {
      return subjectsServices()
        .create(data)
        .then((response) => {
          clear();
          listSubject();
          toast({
            status: "success",
            title: `Disciplina criado com sucesso ✅`,
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
              `Não foi possível criar o Disciplina :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listSubject],
  );

  const deleteSubject = useCallback(
    async (id: string) => {
      return subjectsServices()
        .delete(id)
        .then((response) => {
          listSubject();
          toast({
            status: "success",
            title: `Disciplina deletada com sucesso ✅`,
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
              `Não foi possível deletar a Disciplina :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listSubject],
  );

  const value = useMemo(() => {
    return {
      subjects,
      isLoading,
      createSubject,
      listSubject,
      deleteSubject,
    };
  }, [subjects, isLoading, createSubject, listSubject, deleteSubject]);

  return (
    <SubjectsContext.Provider value={value}>
      {children}
    </SubjectsContext.Provider>
  );
}

export { SubjectsProvider };
