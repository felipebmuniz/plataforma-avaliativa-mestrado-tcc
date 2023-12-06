import { ReactNode, useCallback, useMemo, useState } from "react";
import { AnswersContext } from "@/contexts";
import { useToast } from "@chakra-ui/react";
import { answersCreate, answersList } from "@/types/answers";
import { answersServices } from "@/services/answers";
import { useRouter } from "next/router";

interface IAnswersProviderProps {
  children: ReactNode;
}

function AnswersProvider({ children }: IAnswersProviderProps) {
  const toast = useToast();
  const router = useRouter();

  const [answers, setAnswers] = useState<answersList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const listAnswers = useCallback(
    async (evaluationId: string) => {
      setIsLoading(() => true);
      return answersServices()
        .list(evaluationId)
        .then((response) => {
          setIsLoading(() => false);
          setAnswers(() => response.data);
        })
        .catch(() => {
          setIsLoading(() => false);
          toast({
            status: "error",
            title: `Error ao buscar Respostas :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast],
  );

  const createAnswers = useCallback(
    async (data: answersCreate, accessToken: string, clear?: () => void) => {
      return answersServices()
        .create(data, accessToken)
        .then((response) => {
          clear && clear();
          toast({
            status: "success",
            title: `Resposta efetuada com sucesso ✅`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
          router.push("/");
        })
        .catch((error) => {
          toast({
            status: "error",
            title: `Não foi possível efetuar a  resposta :(`,
            position: "top-right",
            isClosable: true,
            variant: "left-accent",
          });
        });
    },
    [toast, router],
  );

  const value = useMemo(() => {
    return {
      answers,
      isLoading,
      createAnswers,
      listAnswers,
    };
  }, [answers, isLoading, createAnswers, listAnswers]);

  return (
    <AnswersContext.Provider value={value}>{children}</AnswersContext.Provider>
  );
}

export { AnswersProvider };
