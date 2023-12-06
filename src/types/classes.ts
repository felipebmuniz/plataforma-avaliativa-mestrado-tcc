import { subjectsList } from "./subjects";
import { userList } from "./users";

export interface classesList {
  id: string;
  code: string;
  period: number;
  year: number;
  open: boolean;
  subject: subjectsList;
  teacher: {
    teacherCode: string;
    name: string;
    email: string;
    type: number;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  students: {
    studentCode: string;
    name: string;
    email: string;
    type: number;
    id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface classesCreate {
  code: string;
  subjectId: string;
  teacherId: string;
  period: number;
  year: number;
  open: boolean;
}

export interface classesUpdate {
  classId: string;
  code?: string;
  subjectId?: string;
  teacherId?: string;
  period?: number;
  year?: number;
  open?: boolean;
}

export interface classesRelationStudent {
  classId: string;
  studentId: string;
}

// export interface classesRelationTeacher {
//   classId: string;
//   teacherId: string;
// }

export interface classesRelationEvaluation {
  classId: string;
  evaluationId: string;
}
