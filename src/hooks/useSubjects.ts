import { SubjectsContext, ISubjectsContext } from '@/contexts';
import { useContext } from 'react';

function useSubjects(): ISubjectsContext {
  const context = useContext(SubjectsContext);

  if (!context) {
    throw new Error('useUsures must be used within an AppProvider');
  }

  return context;
}

export default useSubjects;
