import { subjectsCreate, subjectsUpdate, subjectsList } from "@/types/subjects";
import { createContext } from "react";

export interface ISubjectsContext {
  subjects: subjectsList[];
  isLoading: boolean;
  createSubject: (data: subjectsCreate, clear: () => void) => Promise<void>;
  updateSubject?: (data: subjectsUpdate, clear: () => void) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
  listSubject: () => void;
}

export const SubjectsContext = createContext<ISubjectsContext>(
  {} as ISubjectsContext,
);
