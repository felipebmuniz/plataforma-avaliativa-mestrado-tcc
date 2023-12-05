import React from "react";
import { AcessesLoginResponse, ResponseUserEvaluationForm } from "@/types/auth";
import { createContext } from "react";

export interface IAuthContext {
  accessToken: string;
  signIn: (data: AcessesLoginResponse, clear: () => void) => Promise<void>;
  signOut: () => void;
  updateToken: (accessToken: string) => void;
  validateUser: (token: string) => void;
  ValidateEvaluation: (id: string, accessToken: string) => void;
  dataUserEvaluationForm: ResponseUserEvaluationForm | undefined;
  setDataUserEvaluationForm: React.Dispatch<
    React.SetStateAction<ResponseUserEvaluationForm | undefined>
  >;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
