import { useContext } from 'react';
import { CompanyContextValue, CompanyContext } from '@/contexts';

function useCompany(): CompanyContextValue {
  const themeContext = useContext(CompanyContext);

  if (!themeContext) {
    throw new Error('useCompany deve ser usado dentro de um CompanyProvider');
  }

  return themeContext;
}

export default useCompany;
