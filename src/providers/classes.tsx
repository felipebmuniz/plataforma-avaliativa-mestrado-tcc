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
        setIsLoading(() => false);

        setClasses(() => response.data);
      })
      .catch(() => {
        setIsLoading(() => false);
        toast({
          status: "error",
          title: `Error ao buscar usuários :(`,
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
            title: `Usuário criado com sucesso ✅`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        })
        .catch((error) => {
          toast({
            status: "error",
            title: `Não foi possível criar o usuário :(`,
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
            title: `Não foi possível criar a relação :(`,
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
            title: `Não foi possível criar a relação :(`,
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
            title: `Não foi possível criar a relação :(`,
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
      relationClassesStudent,
      relationEvaluationStudent,
      relationEvaluationTeacher,
    };
  }, [
    classes,
    isLoading,
    createClasses,
    listClasses,
    relationClassesStudent,
    relationEvaluationStudent,
    relationEvaluationTeacher,
  ]);

  return (
    <ClassesContext.Provider value={value}>{children}</ClassesContext.Provider>
  );
}

export { ClassesProvider };
