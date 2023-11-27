import { ReactNode, useCallback, useMemo, useState } from 'react';
import { api } from '../services/api';
import { AcessesLoginResponse, LoginResponse } from '@/types/auth';
import { UsersContext } from '@/contexts';
import { useToast } from '@chakra-ui/react';
import { authServices } from '@/services/auth';
import { useRouter } from 'next/router';
import { userCreate, userList, userType } from '@/types/users';
import { usersServices } from '@/services/users';

interface IUsersProviderProps {
  children: ReactNode;
}

function UsersProvider({ children }: IUsersProviderProps) {
  const toast = useToast();

  const [usersStudent, setUsersStudent] = useState<userList[]>([]);
  const [usersTeacher, setUsersTeacher] = useState<userList[]>([]);

  const createUser = useCallback(
    async (data: userCreate, type: userType, clear: () => void) => {
      return usersServices()
        .create(data, type)
        .then((response) => {
          clear();

          toast({
            status: 'success',
            title: `Usuário criado com sucesso ✅`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
        })
        .catch((error) => {
          toast({
            status: 'error',
            title: `Não foi possível criar o usuário :(`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
        });
    },
    [toast],
  );

  const listUser = useCallback(
    async (type: userType) => {
      return usersServices()
        .list(type)
        .then((response) => {
          type == 'student' && setUsersStudent(() => response.data);
          type == 'teacher' && setUsersTeacher(() => response.data);
        })
        .catch(() => {
          toast({
            status: 'error',
            title: `Error ao buscar usuários :(`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
        });
    },
    [toast],
  );

  const value = useMemo(() => {
    return {
      usersStudent,
      usersTeacher,
      createUser,
      listUser,
    };
  }, [usersStudent, usersTeacher, createUser, listUser]);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export { UsersProvider };
