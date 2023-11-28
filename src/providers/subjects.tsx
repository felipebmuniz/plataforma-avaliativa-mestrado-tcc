import { ReactNode, useCallback, useMemo, useState } from 'react';
import { SubjectsContext } from '@/contexts';
import { useToast } from '@chakra-ui/react';
import { subjectsCreate, subjectsList } from '@/types/subjects';
import { subjectsServices } from '@/services/subjects';

interface ISubjectsProviderProps {
  children: ReactNode;
}

function SubjectsProvider({ children }: ISubjectsProviderProps) {
  const toast = useToast();

  const [subjects, setSubjects] = useState<subjectsList[]>([]);

  const listSubject = useCallback(async () => {
    return subjectsServices()
      .list()
      .then((response) => {
        setSubjects(() => response.data);
      })
      .catch(() => {
        toast({
          status: 'error',
          title: `Error ao buscar disciplinas :(`,
          position: 'top-right',
          isClosable: true,
          variant: 'left-accent',
        });
      });
  }, [toast]);

  const createSubject = useCallback(
    async (data: subjectsCreate, clear: () => void) => {
      return subjectsServices()
        .create(data)
        .then((response) => {
          clear();
          listSubject();
          toast({
            status: 'success',
            title: `Disciplina criado com sucesso ✅`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
        })
        .catch((error) => {
          toast({
            status: 'error',
            title: `Não foi possível criar o Disciplina :(`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
        });
    },
    [toast, listSubject],
  );

  const value = useMemo(() => {
    return {
      subjects,
      createSubject,
      listSubject,
    };
  }, [subjects, createSubject, listSubject]);

  return (
    <SubjectsContext.Provider value={value}>
      {children}
    </SubjectsContext.Provider>
  );
}

export { SubjectsProvider };
