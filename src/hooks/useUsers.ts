import { UsersContext, IUsersContext } from '@/contexts';
import { useContext } from 'react';

function useUsers(): IUsersContext {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('useUsures must be used within an AppProvider');
  }

  return context;
}

export default useUsers;
