import { AuthContext, IAuthContext } from '@/contexts/auth';
import { useContext } from 'react';

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }

  return context;
}

export default useAuth;
