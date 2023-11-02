import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FormsContext } from '@/contexts/createForms';
import { formsServices } from '@/services/forms';

interface FormsProviderProps {
  children: ReactNode;
}

function FormsProvider({ children }: FormsProviderProps) {
  const [dataForms, setDataForms] = useState();

  const getDataForms = useCallback(() => {
    formsServices()
      .list()
      .then((res) => {
        console.log('[Res Forms List] =>', res);
      });
  }, []);

  const getDataFormsByID = useCallback((id: string) => {}, []);

  useEffect(() => {
    getDataForms();
  }, [getDataForms]);

  return <FormsContext.Provider value={{}}>{children}</FormsContext.Provider>;
}

export { FormsProvider };
