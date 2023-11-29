import { ReactNode, useCallback, useState } from 'react';
import { api } from '../services/api';
import { AcessesLoginResponse, LoginResponse } from '@/types/auth';
import { AuthContext } from '@/contexts';
import { useToast } from '@chakra-ui/react';
import { authServices } from '@/services/auth';
import { useRouter } from 'next/router';
import axios from 'axios';

export const TOKEN_KEY = '@PAM-Token';

interface IAuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: IAuthProviderProps) {
  const router = useRouter();
  const toast = useToast();

  const [data, setData] = useState<LoginResponse>(() => {
    const accessToken =
      typeof window !== 'undefined' &&
      localStorage.getItem(`${TOKEN_KEY}:accessToken`);

    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      return { accessToken };
    }

    return {} as LoginResponse;
  });

  const updateToken = useCallback(
    (accessToken: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`${TOKEN_KEY}:accessToken`, accessToken);

        setData(() => ({
          accessToken: accessToken ?? data.accessToken,
        }));
      }
    },
    [data.accessToken],
  );

  const signIn = useCallback(
    async (loginData: AcessesLoginResponse, clear: () => void) => {
      return authServices()
        .login(loginData)
        .then((response) => {
          const { accessToken } = response.data;
          if (typeof window !== 'undefined') {
            localStorage.setItem(`${TOKEN_KEY}:accessToken`, accessToken);

            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${accessToken}`;

            updateToken(accessToken);

            clear();

            router.push('/admin/usuarios');

            toast({
              status: 'success',
              title: `Login realizado com sucesso ✅`,
              position: 'top-right',
              isClosable: true,
              variant: 'left-accent',
            });
          }
        })
        .catch(({ response }) => {
          console.log('[error] =>', response);

          toast({
            status: 'error',
            title: `Não foi possível realizar o login :( Cheque suas credenciais!`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
        });
    },
    [toast, updateToken, router],
  );

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${TOKEN_KEY}:accessToken`);

      setData(() => ({} as LoginResponse));

      router.push('/');

      console.log('signOut');

      toast({
        status: 'success',
        title: `Logout realizado com sucesso ✅`,
        position: 'top-right',
        isClosable: true,
        variant: 'left-accent',
      });
    }
  }, [router, toast]);

  const validateUser = useCallback(
    async (token: string) => {
      return authServices()
        .Validate({ validationToken: token })
        .then(() => {
          toast({
            status: 'success',
            title: `Usuário autenticado com sucesso ✅`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
          router.push('/');
        })
        .catch(() => {
          toast({
            status: 'error',
            title: `Não foi possível autenticado o usuário :( Entre em contado com a coordenação!`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
          router.push('/');
        });
    },
    [toast, router],
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        signIn,
        signOut,
        updateToken,
        validateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
