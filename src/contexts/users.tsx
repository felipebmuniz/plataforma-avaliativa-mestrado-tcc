import { userType, userCreate, userUpdate, userList } from '@/types/users';
import { createContext } from 'react';

export interface IUsersContext {
  usersStudent: userList[];
  usersTeacher: userList[];
  isLoadingStudent: boolean;
  isLoadingTeacher: boolean;
  createUser: (
    data: userCreate,
    type: userType,
    clear: () => void,
  ) => Promise<void>;
  updateUser?: (
    data: userUpdate,
    type: userType,
    clear: () => void,
  ) => Promise<void>;
  deleteUser?: (id: string) => void;
  listUser: (type: userType) => void;
}

export const UsersContext = createContext<IUsersContext>({} as IUsersContext);
