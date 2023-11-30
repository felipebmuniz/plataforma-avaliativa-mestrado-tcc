import { EvaluationsContext, IEvaluationsContext } from "@/contexts";
import { useContext } from "react";

function useEvaluations(): IEvaluationsContext {
  const context = useContext(EvaluationsContext);

  if (!context) {
    throw new Error("useEvaluations must be used within an AppProvider");
  }

  return context;
}

export default useEvaluations;
