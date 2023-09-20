import { createContext } from 'react';

export type CompanyContextValue = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getProvider: (providerId: number) => void;
};

const CompanyContext = createContext<CompanyContextValue>(
  {} as CompanyContextValue,
);

export { CompanyContext };
