import { answersCreate, answersList } from "@/types/answers";
import { createContext } from "react";

export interface IAnswersContext {
  answers: answersList[];
  isLoading: boolean;
  isLoadingCreate: boolean;
  createAnswers: (
    data: answersCreate,
    accessToken: string,
    clear?: () => void,
  ) => Promise<void>;
  listAnswers: (evaluationId: string) => void;
}

export const AnswersContext = createContext<IAnswersContext>(
  {} as IAnswersContext,
);
