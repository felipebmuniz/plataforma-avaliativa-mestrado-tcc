import { ReactNode, useCallback, useState } from 'react';
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

  const [users, setUsers] = useState<userList[]>([]);

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
          console.log('[listUser] =>', response.data);

          setUsers(() => response.data);
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

  return (
    <UsersContext.Provider
      value={{
        users,
        createUser,
        listUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersProvider };
