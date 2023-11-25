import { AcessesLoginResponse } from '@/types/auth';
import { createContext } from 'react';

export interface IAuthContext {
  accessToken: string;
  signIn: (data: AcessesLoginResponse, clear: () => void) => Promise<void>;
  signOut: () => void;
  updateToken: (accessToken: string) => void;
  validateUser: (token: string) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
