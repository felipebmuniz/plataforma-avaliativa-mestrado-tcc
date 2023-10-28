import { useContext } from 'react';
import { CreateFormsContextValue, CreateFormsContext } from '@/contexts';

function useCreateForms(): CreateFormsContextValue {
  const themeContext = useContext(CreateFormsContext);

  if (!themeContext) {
    throw new Error(
      'useCreateForms deve ser usado dentro de um CreateFormsProvider',
    );
  }

  return themeContext;
}

export default useCreateForms;
