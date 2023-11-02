import { createContext } from 'react';

export type FormsContextValue = {};

const FormsContext = createContext<FormsContextValue>({} as FormsContextValue);

export { FormsContext };
