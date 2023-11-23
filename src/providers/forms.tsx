import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FormsContext } from '@/contexts/createForms';
import { formsServices } from '@/services/forms';
import { FormsResponse } from '@/types/forms';

interface FormsProviderProps {
  children: ReactNode;
}

function FormsProvider({ children }: FormsProviderProps) {
  const [forms, setForms] = useState<FormsResponse[]>([]);
  const [formDataByID, setFormDataByID] = useState<FormsResponse>();

  const createDataForms = useCallback((name: string) => {
    formsServices()
      .create({ name })
      .then((data) => {
        console.log('[Res Forms create] =>', data);
      });
  }, []);

  const getDataForms = useCallback(() => {
    formsServices()
      .list()
      .then((data) => {
        console.log('[Res Forms List] =>', data);
        setForms(() => data);
      });
  }, []);

  const getDataFormsByID = useCallback((id: string) => {
    formsServices()
      .show(id)
      .then((data) => {
        console.log('[Res Forms Show] =>', data);
        setFormDataByID(() => data);
      });
  }, []);

  const putDataFormsByID = useCallback((id: string) => {
    formsServices()
      .show(id)
      .then((data) => {
        console.log('[Res Forms Show] =>', data);
      });
  }, []);

  useEffect(() => {
    // getDataForms();
    // getDataFormsByID('c4dd3028-ac88-4ea9-9f8f-7e262a7bd1db');
  }, [getDataForms, getDataFormsByID]);

  return <FormsContext.Provider value={{}}>{children}</FormsContext.Provider>;
}

export { FormsProvider };
