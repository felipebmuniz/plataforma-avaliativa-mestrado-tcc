import { FormsResponse, IListFrom, IPutFrom, IValuesForm } from "@/types/forms";
import { createContext } from "react";

export interface IFormsContextValue {
  forms: IListFrom[];
  formByID: FormsResponse | undefined;
  isLoading: boolean;
  isLoadingShow: boolean;
  createForms: (data: IValuesForm, clear: () => void) => Promise<void>;
  showFormsByID: (id: string) => Promise<void>;
  updateFormsByID: (data: IPutFrom, clear?: () => void) => void;
  deleteFormsByID?: (id: string) => void;
  listForms: () => void;
}

const FormsContext = createContext<IFormsContextValue>(
  {} as IFormsContextValue,
);

export { FormsContext };
