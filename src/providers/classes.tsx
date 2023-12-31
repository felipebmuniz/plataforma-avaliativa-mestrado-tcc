import { ReactNode, useCallback, useMemo, useState } from "react";
import { ClassesContext } from "@/contexts";
import { useToast } from "@chakra-ui/react";
import { userCreate, userList, userType } from "@/types/users";

import { classesServices } from "@/services/classes";
import { classesRelationsServices } from "@/services/classesRelations";
import {
  classesCreate,
  classesList,
  classesRelationEvaluation,
  classesRelationStudent,
} from "@/types/classes";

interface IClassesProviderProps {
  children: ReactNode;
}

function ClassesProvider({ children }: IClassesProviderProps) {
  const toast = useToast();

  const [classes, setClasses] = useState<classesList[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const listClasses = useCallback(async () => {
    setIsLoading(() => true);
    return classesServices()
      .list()
      .then((response) => {
        setClasses(() => response.data);
        setIsLoading(() => false);
      })
      .catch(({ response }) => {
        console.log("[error] =>", response.data);
        setIsLoading(() => false);
        toast({
          status: "error",
          title: `Error ao buscar turmas :(`,
          position: "top-right",
          isClosable: true,
          variant: "left-accent",
        });
      });
  }, [toast]);

  const createClasses = useCallback(
    async (data: classesCreate, clear: () => void) => {
      return classesServices()
        .create(data)
        .then((response) => {
          clear();
          listClasses();

          toast({
            status: "success",
            title: `Turma criada com sucesso ✅`,
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
              response?.data?.message ?? `Não foi possível criar a turma :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listClasses],
  );

  const deleteClasses = useCallback(
    async (id: string) => {
      return classesServices()
        .delete(id)
        .then((response) => {
          listClasses();

          toast({
            status: "success",
            title: `Turma removida com sucesso ✅`,
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
              response?.data?.message ?? `Não foi possível remover a turma :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, listClasses],
  );

  const relationClassesStudent = useCallback(
    async (data: classesRelationStudent, clear?: () => void) => {
      return classesRelationsServices()
        .createRelationStudent(data)
        .then((response) => {
          clear && clear();

          toast({
            status: "success",
            title: `Relação criada com sucesso ✅`,
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
              response?.data?.message ?? `Não foi possível criar a relação :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast],
  );

  const relationEvaluationStudent = useCallback(
    async (data: classesRelationEvaluation, clear?: () => void) => {
      return classesRelationsServices()
        .createRelationStudentEvaluation(data)
        .then((response) => {
          clear && clear();

          toast({
            status: "success",
            title: `Relação criada com sucesso ✅`,
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
              response?.data?.message ?? `Não foi possível criar a relação :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast],
  );

  const relationEvaluationTeacher = useCallback(
    async (data: classesRelationEvaluation, clear?: () => void) => {
      return classesRelationsServices()
        .createRelationTeacherEvaluation(data)
        .then((response) => {
          clear && clear();

          toast({
            status: "success",
            title: `Relação criada com sucesso ✅`,
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
              response?.data?.message ?? `Não foi possível criar a relação :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast],
  );

  const value = useMemo(() => {
    return {
      classes,
      isLoading,
      createClasses,
      listClasses,
      deleteClasses,
      relationClassesStudent,
      relationEvaluationStudent,
      relationEvaluationTeacher,
    };
  }, [
    classes,
    isLoading,
    createClasses,
    listClasses,
    deleteClasses,
    relationClassesStudent,
    relationEvaluationStudent,
    relationEvaluationTeacher,
  ]);

  return (
    <ClassesContext.Provider value={value}>{children}</ClassesContext.Provider>
  );
}

export { ClassesProvider };
