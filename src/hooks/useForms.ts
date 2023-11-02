import { useContext } from 'react';
import { FormsContextValue, FormsContext } from '@/contexts';

function useForms(): FormsContextValue {
  const themeContext = useContext(FormsContext);

  if (!themeContext) {
    throw new Error('useForms deve ser usado dentro de um FormsProvider');
  }

  return themeContext;
}

export default useForms;
