import { createContext } from 'react';

export type CreateFormsContextValue = {};

const CreateFormsContext = createContext<CreateFormsContextValue>(
  {} as CreateFormsContextValue,
);

export { CreateFormsContext };
