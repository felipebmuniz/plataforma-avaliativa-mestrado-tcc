import { useContext } from "react";
import { IFormsContextValue, FormsContext } from "@/contexts";

function useForms(): IFormsContextValue {
  const themeContext = useContext(FormsContext);

  if (!themeContext) {
    throw new Error("useForms deve ser usado dentro de um FormsProvider");
  }

  return themeContext;
}

export default useForms;
