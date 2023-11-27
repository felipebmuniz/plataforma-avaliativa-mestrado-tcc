export type userType = 'student' | 'teacher';

export enum EnumUserType {
  student = 'Students',
  teacher = 'Teachers',
}

export interface userList {
  name: string;
  email: string;
  userId: string;
  teacherId?: string;
  studentId?: string;
  teacherCode?: string;
  studentCode?: string;
  validated: boolean;
  type: number;
}

export interface userCreate {
  name: string;
  email: string;
  studentCode?: string | undefined;
  teacherCode?: string | undefined;
}

export interface userUpdate {
  name?: string;
  email?: string;
  userId?: string;
  teacherId?: string;
  studentId?: string;
  teacherCode?: string;
  studentCode?: string;
}
