import {
  evaluationsCreate,
  evaluationsUpdate,
  evaluationsList,
} from "@/types/evaluations";
import { createContext } from "react";

export interface IEvaluationsContext {
  evaluations: evaluationsList[];
  isLoading: boolean;
  createEvaluation: (
    data: evaluationsCreate,
    clear: () => void,
  ) => Promise<void>;
  updateEvaluation?: (
    data: evaluationsUpdate,
    clear: () => void,
  ) => Promise<void>;
  deleteEvaluation: (id: string) => void;
  listEvaluation: () => void;
}

export const EvaluationsContext = createContext<IEvaluationsContext>(
  {} as IEvaluationsContext,
);
