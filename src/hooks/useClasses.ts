import { ClassesContext, IClassesContext } from '@/contexts';
import { useContext } from 'react';

function useClasses(): IClassesContext {
  const context = useContext(ClassesContext);

  if (!context) {
    throw new Error('useClasses must be used within an AppProvider');
  }

  return context;
}

export default useClasses;
