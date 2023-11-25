import { ReactNode, useCallback, useState } from 'react';
import { api } from '../services/api';
import { AcessesLoginResponse, LoginResponse } from '@/types/auth';
import { AuthContext } from '@/contexts/auth';
import { useToast } from '@chakra-ui/react';
import { authServices } from '@/services/auth';
import { useRouter } from 'next/router';

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
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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

            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${accessToken}`;

            updateToken(accessToken);

            clear();

            router.push('/admin/formularios');

            toast({
              status: 'success',
              title: `Login realizado com sucesso ✅`,
              position: 'top-right',
              isClosable: true,
              variant: 'left-accent',
            });
          }
        })
        .catch((error) => {
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
    }
  }, []);

  const validateUser = useCallback(
    async (token: string) => {
      return authServices()
        .Validate({ token: token })
        .then(() => {
          router.push('/admin/formularios');

          toast({
            status: 'success',
            title: `Usuário autenticado com sucesso ✅`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
        })
        .catch(() => {
          toast({
            status: 'error',
            title: `Não foi possível autenticado o usuário :( Entre em contado com a coordenação!`,
            position: 'top-right',
            isClosable: true,
            variant: 'left-accent',
          });
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
