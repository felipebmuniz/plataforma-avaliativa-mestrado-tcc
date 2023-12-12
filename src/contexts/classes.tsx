import {
  classesList,
  classesCreate,
  classesUpdate,
  classesRelationStudent,
  classesRelationEvaluation,
} from "@/types/classes";
import { createContext } from "react";

export interface IClassesContext {
  classes: classesList[];
  isLoading: boolean;
  createClasses: (data: classesCreate, clear: () => void) => Promise<void>;
  updateClasses?: (data: classesUpdate, clear: () => void) => Promise<void>;
  deleteClasses: (id: string) => Promise<void>;
  listClasses: () => void;
  relationClassesStudent: (
    data: classesRelationStudent,
    clear?: () => void,
  ) => void;
  relationEvaluationStudent: (
    data: classesRelationEvaluation,
    clear?: () => void,
  ) => void;
  relationEvaluationTeacher: (
    data: classesRelationEvaluation,
    clear?: () => void,
  ) => void;
}

export const ClassesContext = createContext<IClassesContext>(
  {} as IClassesContext,
);
