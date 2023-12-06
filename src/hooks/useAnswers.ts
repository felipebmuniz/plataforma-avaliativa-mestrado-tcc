import { AnswersContext, IAnswersContext } from "@/contexts";
import { useContext } from "react";

function useAnswers(): IAnswersContext {
  const context = useContext(AnswersContext);

  if (!context) {
    throw new Error("useAnswers must be used within an AppProvider");
  }

  return context;
}

export default useAnswers;
